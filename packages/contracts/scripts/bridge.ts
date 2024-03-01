import { ethers, getNamedAccounts, run, network } from "hardhat";
import { impersonateAccount, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { Constants } from "@/utils";
import deploySingletons from "@/deploy/utils/deploy_singleton";
import deploySafeProxy from "@/deploy/utils/deploy_safe_proxy";
import { ISafe__factory, OmnaccountFallback__factory } from "@/typechain-types";

async function main() {
  const { owner, deployer, spokePool, relayer, WETH } =
    await getNamedAccounts();
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
  let safe = OmnaccountFallback__factory.connect(safeAddress);

  await impersonateAccount(spokePool);
  const spokePoolSigner = await ethers.getSigner(spokePool);
  safe = safe.connect(spokePoolSigner);

  if (await spokePoolSigner.provider.getBalance(spokePool) === 0n) {
    await setBalance(spokePool, ethers.parseEther("1"));
  }

  const tx = await safe.handleV3AcrossMessage(
    WETH,
    ethers.parseEther("1"),
    relayer,
    "0x"
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
