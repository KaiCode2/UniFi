import { ethers, getNamedAccounts, network, tracer } from "hardhat";
import { impersonateAccount, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import deploySingletons from "@/deploy/utils/deploy_singleton";
import deploySafeProxy from "@/deploy/utils/deploy_safe_proxy";
import { IERC20__factory, OmnaccountFallback__factory } from "@/typechain-types";
import execSafeTransaction from "@/deploy/utils/exec_transaction";
import { ISafe__factory } from "@/typechain-types/factories/contracts/interfaces";

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
    omnaccountFallbackAddress,
  );
  let safe: any = ISafe__factory.connect(safeAddress, ownerSigner);

  await execSafeTransaction(
    safe,
    await safe.enableModule.populateTransaction(omnaccountFallbackAddress),
    ownerSigner
  );

  safe = OmnaccountFallback__factory.connect(safeAddress, ownerSigner);

  await impersonateAccount(spokePool);
  const spokePoolSigner = await ethers.getSigner(spokePool);
  safe = safe.connect(spokePoolSigner);

  if (await spokePoolSigner.provider.getBalance(spokePool) === 0n) {
    await setBalance(spokePool, ethers.parseEther("1"));
  }

  // Simulate WETH deposit
  await setBalance(deployer, ethers.parseEther("10"));
  await deployerSigner.sendTransaction({
    to: WETH,
    value: ethers.parseEther("1"),
  });
  await IERC20__factory.connect(WETH, deployerSigner).transfer(safeAddress, ethers.parseEther("1"));
  // console.log("WETH balance: ", (await IERC20__factory.connect(WETH, deployerSigner).balanceOf(safeAddress)).toString())

  const withdrawData = (new ethers.Interface(["function withdraw(uint wad)"])).encodeFunctionData("withdraw", [ethers.parseEther("1")]);
  console.log("Withdraw data: ", withdrawData, " for WETH: ", WETH);
  console.log("Safe", safeAddress, await safe.getAddress())
  const tx = await safe.handleV3AcrossMessage(
    WETH,
    ethers.parseEther("1"),
    relayer,
    ethers.AbiCoder.defaultAbiCoder().encode(["address[]", "bytes[]"], [[WETH], [withdrawData]]) // WETH withdraw
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
