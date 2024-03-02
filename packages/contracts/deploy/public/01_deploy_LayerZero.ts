import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types/runtime';

const deployLayerZeroMessager: DeployFunction = async function ({
  ethers,
  getNamedAccounts: { layerZeroTestEndpoint },
}: HardhatRuntimeEnvironment) {
  console.log(`the layer zero test endpoint`, layerZeroTestEndpoint);
  // const lock = await ethers.deployContract('messager', [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();
};
export default deployLayerZeroMessager;
