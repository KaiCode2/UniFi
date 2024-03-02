import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import deploySafeProxy from "../utils/deploy_safe_proxy";
import deploySingletons from "../utils/deploy_singleton";
import execSafeTransaction from "../utils/exec_transaction";
import OmnaccountModule from "@/artifacts/contracts/OmnaccountModule.sol/OmnaccountModule.json";
import UniFiPlugin from "@/artifacts/contracts/UniFiPlugin.sol/UniFiPlugin.json";
import { ISafe__factory } from "@/typechain-types/factories/contracts/interfaces/ISafe__factory";
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
    UniFiPluginAddress,
  } = await deploySingletons(deployerSigner, spokePool);

  await deployments.save(Constants.Contracts.UniFiPlugin, {
    address: UniFiPluginAddress,
    abi: UniFiPlugin.abi,
  });

  // TODO: deploy with module and fallback set
  const safeAddress = await deploySafeProxy(
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    owner,
    deployerSigner,
    UniFiPluginAddress,
    // TODO: add module during creation
  );

  const safe = ISafe__factory.connect(safeAddress, ownerSigner);

  const isFallbackModuleEnabled = await safe.isModuleEnabled(UniFiPluginAddress);
  if (!isFallbackModuleEnabled) {
    await execSafeTransaction(
      safe,
      await safe.enableModule.populateTransaction(UniFiPluginAddress),
      ownerSigner
    );
  }

  console.log("Vault deployed to:", safeAddress);

  await deployments.save("ISafe", {
    address: safeAddress,
    abi: UniFiPlugin.abi,
    // linkedData: {
    //   [`${owner}_vault`]: safeAddress,
    // },
  });
};
deployVault.tags = ["Vault"];
export default deployVault;
