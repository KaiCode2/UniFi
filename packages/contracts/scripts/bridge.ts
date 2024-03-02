import { ethers, getNamedAccounts, network, } from "hardhat";
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
import { EthersAdapter, SigningMethod, buildSignatureBytes, buildContractSignature } from "@safe-global/protocol-kit";
import * as SafeSdk from "@safe-global/protocol-kit";
import {
  getMultiSendCallOnlyDeployment,
  getMultiSendDeployment,
} from "@safe-global/safe-deployments";
import { signatures } from "@/utils";

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

  console.log("domain sep: ", await safe.domainSeparator())

  const chainId = await ownerSigner.provider
    .getNetwork()
    .then(({ chainId }) => chainId);
  safe = OmnaccountFallback__factory.connect(safeAddress, ownerSigner);

  const multiSendAddress =
    getMultiSendDeployment({ network: chainId.toString() })
      ?.defaultAddress ?? "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
  const multiSendCallOnlyAddress =
    getMultiSendCallOnlyDeployment({ network: chainId.toString() })
      ?.defaultAddress ?? "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";
  // @ts-ignore
  const contractNetworks: SafeSdk.ContractNetworksConfig = {
    // @ts-ignore
    [chainId.toString()]: {
      multiSendAddress,
      multiSendCallOnlyAddress,
    },
  };
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: ownerSigner,
  });
  const connection = await SafeSdk.default.create({
    ethAdapter,
    safeAddress: safeAddress,
    contractNetworks,
  });
  const nonce = await connection.getNonce();

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

  const dataStruct = signatures.makeBridgeTypedMessage(
    [WETH],
    [withdrawData],
    nonce,
    chainId,
    safeAddress
  );
  connection.isOwner
  
  const message = connection.createMessage(dataStruct);
  const signed = await connection.signMessage(message, SigningMethod.ETH_SIGN_TYPED_DATA_V3);
  // console.log("Signed message: ", signed, " message: ", message);
  // console.log("struct hash: ", ethers.TypedDataEncoder.hashStruct("BridgeCall", dataStruct.types, dataStruct.message));
  // console.log("type hash: ", ethers.TypedDataEncoder.)
  // console.log("domain sep: ", ethers.TypedDataEncoder.hashDomain(dataStruct.domain));
  // console.log("typedDataHash: ", ethers.TypedDataEncoder.hash(dataStruct.domain, dataStruct.types, dataStruct.message));

  // const signatures = signed.signatures.values()
  // console.log("Signatures: ", buildSignatureBytes([signed.getSignature(owner)!]), await buildContractSignature(Array.from(signed.signatures.values()), owner), signed.getSignature(owner));
  // console.log("owner: ", owner, " safe owners: ", await connection.getOwners(), " safe threshold: ", await connection.getThreshold());

  const signature = await ownerSigner.signTypedData(dataStruct.domain, dataStruct.types, dataStruct.message);
  console.log("Signature: ", signature);
  // console.log(await connection.isModuleEnabled("0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99"));

  const bridgeData = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address[]", "bytes[]", "uint256", "bytes"],
    [[WETH], [withdrawData], nonce, signature]
  );
  const tx = await safe.handleV3AcrossMessage(
    WETH,
    ethers.parseEther("1"),
    relayer,
    bridgeData
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
