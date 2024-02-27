
import deploySafeProxy from "../utils/deploy_safe_proxy";
import deploySingletons from "../utils/deploy_singleton";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploySafe: DeployFunction = async function ({
  ethers,
  getNamedAccounts
}: HardhatRuntimeEnvironment) {
  const {owner, deployer, entrypoint, spokePool} = await getNamedAccounts();
  const deployerSigner = await ethers.getSigner(deployer);

  const {
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    omnaccountModuleAddress,
  } = await deploySingletons(deployerSigner, entrypoint, spokePool);

  const safeAddress = await deploySafeProxy(
    safeProxyFactoryAddress,
    safeMastercopyAddress,
    owner,
    deployerSigner
  );
};
deploySafe.tags = ["Safe"];
export default deploySafe;
