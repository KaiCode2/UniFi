import { ethers, getNamedAccounts, network, tracer } from "hardhat";
import {
  impersonateAccount,
  setBalance,
} from "@nomicfoundation/hardhat-network-helpers";
import deploySingletons from "@/deploy/utils/deploy_singleton";
import deploySafeProxy from "@/deploy/utils/deploy_safe_proxy";
import {
  IERC20__factory,
  OmnaccountFallback__factory,
} from "@/typechain-types";
import execSafeTransaction from "@/deploy/utils/exec_transaction";
import { ISafe__factory } from "@/typechain-types/factories/contracts/interfaces";
import { EthersAdapter } from "@safe-global/protocol-kit";
import * as SafeSdk from "@safe-global/protocol-kit";
import { getMultiSendCallOnlyDeployment, getMultiSendDeployment } from "@safe-global/safe-deployments";

async function main() {
  const { owner, deployer, spokePool, relayer, WETH } =
    await getNamedAccounts();
  const ownerSigner = await ethers.getSigner(owner);
  const deployerSigner = await ethers.getSigner(deployer);

  const {
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    omnaccountFallbackAddress,
  } = await deploySingletons(deployerSigner, spokePool);

  // TODO: deploy with module
  const safeAddress = await deploySafeProxy(
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    owner,
    deployerSigner,
    omnaccountFallbackAddress
  );
  let safe: any = ISafe__factory.connect(safeAddress, ownerSigner);

  await execSafeTransaction(
    safe,
    await safe.enableModule.populateTransaction(omnaccountFallbackAddress),
    ownerSigner
  );

  const chainId = await ownerSigner.provider
        .getNetwork()
        .then(({ chainId }) => chainId);
  safe = OmnaccountFallback__factory.connect(safeAddress, ownerSigner);
  const multiSendAddress =
    getMultiSendDeployment({ network: chainId.toString() }) ??
    "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
  const multiSendCallOnlyAddress =
    getMultiSendCallOnlyDeployment({ network: chainId.toString() }) ??
    "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";
  const contractNetworks: SafeSdk.ContractNetworksConfig = {
    // @ts-ignore
    [chainId]: {
      multiSendAddress,
      multiSendCallOnlyAddress,
    },
  };
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: ownerSigner,
    contractNetworks,
  });
  const connection = await SafeSdk.default.create({
    ethAdapter,
    safeAddress: safeAddress,
  });

  await impersonateAccount(spokePool);
  const spokePoolSigner = await ethers.getSigner(spokePool);
  safe = safe.connect(spokePoolSigner);

  if ((await spokePoolSigner.provider.getBalance(spokePool)) === 0n) {
    await setBalance(spokePool, ethers.parseEther("1"));
  }

  // Simulate WETH deposit
  await setBalance(deployer, ethers.parseEther("10"));
  await deployerSigner.sendTransaction({
    to: WETH,
    value: ethers.parseEther("1"),
  });
  await IERC20__factory.connect(WETH, deployerSigner).transfer(
    safeAddress,
    ethers.parseEther("1")
  );
  // console.log("WETH balance: ", (await IERC20__factory.connect(WETH, deployerSigner).balanceOf(safeAddress)).toString())

  const withdrawData = new ethers.Interface([
    "function withdraw(uint wad)",
  ]).encodeFunctionData("withdraw", [ethers.parseEther("1")]);
  const encodedCall = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address[]", "bytes[]"],
    [[WETH], [withdrawData]]
  ); // WETH withdraw
  const message = connection.createMessage({
    domain: {
      verifyingContract: safeAddress,
      chainId: network.config.chainId,
    },
    types: {
      SafeMessage: [{ type: "bytes", name: "message" }],
    },
    message: {
      message: encodedCall,
    },
  });
  const signed = await connection.signMessage(message);
  console.log("Signed message: ", signed);
  const tx = await safe.handleV3AcrossMessage(
    WETH,
    ethers.parseEther("1"),
    relayer,
    encodedCall
  );
  console.log("Bridge tx send w/ hash: ", tx.hash);

  const receipt = await tx.wait();
  console.log("Has logs: ", receipt && receipt.logs && receipt.logs.length > 0);
  receipt?.logs?.forEach((log: any) => {
    console.log(log);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
