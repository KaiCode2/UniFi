import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import deploySafeProxy from "../utils/deploy_safe_proxy";
import { deployModuleSingleton } from "../utils/deploy_singleton";
import execSafeTransaction from "../utils/exec_transaction";
import { ISafe__factory } from "@/typechain-types";
import { getSingletonFactoryInfo, SingletonFactoryInfo } from "@safe-global/safe-singleton-factory"


const deployModule: DeployFunction = async function ({
  ethers,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    const { owner, deployer, spokePool } = await getNamedAccounts();
    const deployerSigner = await ethers.getSigner(deployer);
    const ownerSigner = await ethers.getSigner(owner);

    const { chainId } = await ownerSigner.provider.getNetwork()
    const { address } = getSingletonFactoryInfo(Number(chainId)) as SingletonFactoryInfo
    
    const omnaccountModuleAddress = await deployModuleSingleton(address, spokePool, deployerSigner);
    
    console.log("Module deployed to:", omnaccountModuleAddress);
}
deployModule.tags = ["Vault"];
export default deployModule;

