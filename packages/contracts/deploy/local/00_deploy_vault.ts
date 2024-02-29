import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import deploySafeProxy from "../utils/deploy_safe_proxy";
import deploySingletons from "../utils/deploy_singleton";
import execSafeTransaction from "../utils/exec_transaction";
import { ISafe__factory } from "@/typechain-types";

const deployVault: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { owner, deployer, spokePool } = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);
  const ownerSigner = await ethers.getSigner(owner);

  const {
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    omnaccountModuleAddress,
  } = await deploySingletons(deployerSigner, spokePool);

  const safeAddress = await deploySafeProxy(
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    owner,
    deployerSigner
  );

  const safe = ISafe__factory.connect(safeAddress, ownerSigner);

  await execSafeTransaction(
    safe,
    await safe.enableModule.populateTransaction(omnaccountModuleAddress),
    ownerSigner
  );

  console.log("Vault deployed to:", safeAddress);
};
deployVault.tags = ["Vault"];
export default deployVault;
