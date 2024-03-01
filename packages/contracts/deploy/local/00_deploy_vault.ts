import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import deploySafeProxy from "../utils/deploy_safe_proxy";
import deploySingletons from "../utils/deploy_singleton";
import execSafeTransaction from "../utils/exec_transaction";
import OmnaccountModule from "@/artifacts/contracts/OmnaccountModule.sol/OmnaccountModule.json";
import OmnaccountFallback from "@/artifacts/contracts/OmnaccountFallback.sol/OmnaccountFallback.json";
import { ISafe__factory } from "@/typechain-types";
import { Constants } from "@/utils";

const deployVault: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { owner, deployer, spokePool } = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);
  const ownerSigner = await ethers.getSigner(owner);

  const {
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    omnaccountModuleAddress,
    omnaccountFallbackAddress,
  } = await deploySingletons(deployerSigner, spokePool);

  await deployments.save(Constants.Contracts.OmnaccountModule, {
    address: omnaccountModuleAddress,
    abi: OmnaccountModule.abi,
  });
  
  await deployments.save(Constants.Contracts.OmnaccountFallback, {
    address: omnaccountFallbackAddress,
    abi: OmnaccountFallback.abi,
  });

  // TODO: deploy with module and fallback set
  const safeAddress = await deploySafeProxy(
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    owner,
    deployerSigner,
    omnaccountFallbackAddress,
    // TODO: add module during creation
  );

  const safe = ISafe__factory.connect(safeAddress, ownerSigner);

  const isModuleEnabled = await safe.isModuleEnabled(omnaccountModuleAddress);
  if (!isModuleEnabled) {
    await execSafeTransaction(
      safe,
      await safe.enableModule.populateTransaction(omnaccountModuleAddress),
      ownerSigner
    );
  }

  // TODO: Check if fallback handler is already set
  await execSafeTransaction(
    safe,
    await safe.setFallbackHandler.populateTransaction(omnaccountFallbackAddress),
    ownerSigner
  );

  console.log("Vault deployed to:", safeAddress);
};
deployVault.tags = ["Vault"];
export default deployVault;
