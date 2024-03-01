import { task } from "hardhat/config";
import {
  getSingletonFactoryInfo,
  SingletonFactoryInfo,
} from "@safe-global/safe-singleton-factory";
import { getOmnaccountFallbackBytecode, getOmnaccountModuleBytecode } from "@/deploy/utils/deploy_singleton";
import deploySafeProxy, {
  calculateInitializer,
  calculateProxyAddress,
} from "@/deploy/utils/deploy_safe_proxy";
import Safe from "@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json";
import SafeProxyFactory from "@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json";
import type { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getCreate2Address, keccak256, ZeroHash } from "ethers";
import { ISafe__factory, OmnaccountModule__factory } from "@/typechain-types";
import execSafeTransaction from "@/deploy/utils/exec_transaction";
import { Constants } from "@/utils";

task("safe:make", "Makes a new safe")
  .addOptionalParam("signer", "Signer of the new safe")
  .addOptionalParam("salt", "safe generation salt")
  .setAction(
    async (
      { signer }: TaskArguments,
      { getNamedAccounts, ethers, deployments }: HardhatRuntimeEnvironment
    ) => {
      const { spokePool, entrypoint, owner } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const { chainId } = await ownerSigner.provider.getNetwork();
      const { address: factoryAddress } = getSingletonFactoryInfo(
        Number(chainId)
      ) as SingletonFactoryInfo;

      console.log(factoryAddress);

      let { address: omnaccountModuleAddress } = await deployments.get(Constants.Contracts.OmnaccountModule);
      let { address: omnaccountFallbackAddress } = await deployments.get(Constants.Contracts.OmnaccountFallback);

      const {
        safeMastercopyAddress,
        safeProxyFactoryAddress,
        omnaccountModuleAddress: predictedOmnaccountModuleAddress,
        omnaccountFallbackAddress: predictedOmnaccountFallbackAddress,
      } = await getAddresses(factoryAddress, spokePool);

      omnaccountModuleAddress = omnaccountModuleAddress ?? predictedOmnaccountModuleAddress;
      omnaccountFallbackAddress = omnaccountFallbackAddress ?? predictedOmnaccountFallbackAddress;

      // TODO: Check these addresses exist

      console.log(`Safe mastercopy: ${safeMastercopyAddress}`);
      console.log(`Safe proxy factory: ${safeProxyFactoryAddress}`);
      console.log(`Omnaccount module: ${omnaccountModuleAddress}`);
      console.log(`Omnaccount fallback: ${omnaccountFallbackAddress}`);

      const safeAddress = calculateProxyAddress(
        calculateInitializer(owner, omnaccountFallbackAddress),
        safeProxyFactoryAddress,
        safeMastercopyAddress,
      );

      try {
        const deployedCode = await ownerSigner.provider.getCode(safeAddress);
        if (deployedCode === "0x") {
          // Safe not deployed
          await deploySafeProxy(
            safeProxyFactoryAddress,
            safeMastercopyAddress,
            owner,
            ownerSigner
          );
        }
      } catch {}

      console.log(`Safe address: ${safeAddress}`);

      const safe = ISafe__factory.connect(safeAddress, ownerSigner);

      // TODO: Check if module is already enabled
      await execSafeTransaction(
        safe,
        await safe.enableModule.populateTransaction(omnaccountModuleAddress),
        ownerSigner
      );

      console.log("Module enabled!");
    }
  );

task("safe:sign", "Signs a safe transaction")
  .addPositionalParam("to", "Transaction destination")
  .addPositionalParam("data", "Transaction data")
  .addOptionalParam("value", "Transaction value")
  .setAction(
    async (
      args: TaskArguments,
      { getNamedAccounts, ethers }: HardhatRuntimeEnvironment
    ) => {
      const { owner, spokePool } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const { chainId } = await ownerSigner.provider.getNetwork();
      const { address: factoryAddress } = getSingletonFactoryInfo(
        Number(chainId)
      ) as SingletonFactoryInfo;
      const {
        safeMastercopyAddress,
        safeProxyFactoryAddress,
        omnaccountModuleAddress,
      } = await getAddresses(factoryAddress, spokePool);

      const safeAddress = calculateProxyAddress(
        calculateInitializer(owner),
        safeProxyFactoryAddress,
        safeMastercopyAddress
      );

      const safe = ISafe__factory.connect(safeAddress, ownerSigner);
      const address = await safe.getAddress()
      const nonce = await safe.nonce()

      const tx = await execSafeTransaction(
        safe,
        args,
        ownerSigner
      );

      console.log(`Transaction sent: ${tx.hash}`);

      const receipt = await tx.wait();

      if (receipt && receipt.status === 0) {
        console.error(`Transaction failed: ${tx.hash}`);
        return;
      } else {
        console.log(`Transaction confirmed: ${tx.hash}`);
      }
    }
  );
// TODO: Add task to update module to new version

async function getAddresses(
  factory: string,
  spokePool: string
) {
  const safeMastercopyAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(Safe.bytecode)
  );
  const safeProxyFactoryAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(SafeProxyFactory.bytecode)
  );
  const omnaccountModuleAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(getOmnaccountModuleBytecode(spokePool))
  );
  const omnaccountFallbackAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(getOmnaccountFallbackBytecode(spokePool))
  );

  return {
    safeMastercopyAddress,
    safeProxyFactoryAddress,
    omnaccountModuleAddress,
    omnaccountFallbackAddress,
  };
}
