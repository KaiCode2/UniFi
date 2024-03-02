import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployFallbackSingleton, deployModuleSingleton } from "../utils/deploy_singleton";
import OmnaccountModule from "@/artifacts/contracts/OmnaccountModule.sol/OmnaccountModule.json";
import UniFiPlugin from "@/artifacts/contracts/UniFiPlugin.sol/UniFiPlugin.json";
import { getSingletonFactoryInfo, SingletonFactoryInfo } from "@safe-global/safe-singleton-factory"
import { Constants } from "@/utils";

// NOTE: This does NOT deploy a safe vault, it only deploys the singletons
// NOTE: To deploy a safe vault, use the safe:make hardhat task
const deployModule: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
    const { owner, deployer, spokePool } = await getNamedAccounts();
    const deployerSigner = await ethers.getSigner(deployer);
    const ownerSigner = await ethers.getSigner(owner);

    const { chainId } = await ownerSigner.provider.getNetwork()
    const { address: factoryAddress } = getSingletonFactoryInfo(Number(chainId)) as SingletonFactoryInfo
    
    const UniFiPluginAddress = await deployFallbackSingleton(factoryAddress, spokePool, deployerSigner);

    await deployments.save(Constants.Contracts.UniFiPlugin, {
      address: UniFiPluginAddress,
      abi: UniFiPlugin.abi,
    });
    
    console.log("Fallback deployed to:", UniFiPluginAddress);
}
deployModule.tags = ["Vault"];
export default deployModule;

