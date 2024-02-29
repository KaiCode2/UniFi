import { task } from "hardhat/config";
import {
  getSingletonFactoryInfo,
  SingletonFactoryInfo,
} from "@safe-global/safe-singleton-factory";
import { getOmnaccountModuleBytecode } from "@/deploy/utils/deploy_singleton";
import deploySafeProxy, {
  calculateInitializer,
  calculateProxyAddress,
} from "@/deploy/utils/deploy_safe_proxy";
import Safe from "@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json";
import SafeProxyFactory from "@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json";
import type { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getCreate2Address, keccak256, ZeroHash } from "ethers";
import { ISafe__factory } from "@/typechain-types";
import execSafeTransaction from "@/deploy/utils/exec_transaction";

task("safe:make", "Makes a new safe")
  .addOptionalParam("signer", "Signer of the new safe")
  .addOptionalParam("salt", "safe generation salt")
  .setAction(
    async (
      { signer }: TaskArguments,
      { getNamedAccounts, ethers }: HardhatRuntimeEnvironment
    ) => {
      const { spokePool, entrypoint, owner } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const { chainId } = await ownerSigner.provider.getNetwork();
      const { address: factoryAddress } = getSingletonFactoryInfo(
        Number(chainId)
      ) as SingletonFactoryInfo;

      console.log(factoryAddress);

      const safeMastercopyAddress = getCreate2Address(
        factoryAddress,
        ZeroHash,
        keccak256(Safe.bytecode)
      );
      const safeProxyFactoryAddress = getCreate2Address(
        factoryAddress,
        ZeroHash,
        keccak256(SafeProxyFactory.bytecode)
      );
      const omnaccountModuleAddress = getCreate2Address(
        factoryAddress,
        ZeroHash,
        keccak256(getOmnaccountModuleBytecode(entrypoint, spokePool))
      );

      // TODO: Check these addresses exist

      console.log(`Safe mastercopy: ${safeMastercopyAddress}`);
      console.log(`Safe proxy factory: ${safeProxyFactoryAddress}`);
      console.log(`Omnaccount module: ${omnaccountModuleAddress}`);

      const safeAddress = calculateProxyAddress(
        calculateInitializer(owner),
        safeProxyFactoryAddress,
        safeMastercopyAddress
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
