import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Constants } from "@/utils";

const deployVault: DeployFunction = async function ({ethers, getNamedAccounts}: HardhatRuntimeEnvironment) {
    const Factory = await ethers.getContractFactory(Constants.Contracts.OmnaccountModule);
    const { entrypoint, spokePool } = await getNamedAccounts();
    const deployTx = await Factory.deploy(entrypoint, spokePool);
    const instance = await deployTx.waitForDeployment();
    console.log("Deployed OmnaccountModule to:", await instance.getAddress());
}
deployVault.tags = ["Vault"];
export default deployVault;

