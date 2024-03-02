import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { getSingletonFactoryInfo, SingletonFactoryInfo } from "@safe-global/safe-singleton-factory"
import { getCreate2Address, keccak256, parseUnits, ZeroHash, AbiCoder } from "ethers"

import OmnaccountModule from "@/artifacts/contracts/OmnaccountModule.sol/OmnaccountModule.json";
import UniFiPlugin from "@/artifacts/contracts/UniFiPlugin.sol/UniFiPlugin.json";
import Safe from "@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json"
import SafeProxyFactory from "@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json"

export default async function deploySingletons(deployer: SignerWithAddress, spokePool: string) {

  const factoryAddress = await deploySingletonFactory(deployer);
  const safeMastercopyAddress = await deploySingleton(factoryAddress, Safe.bytecode, deployer);
  const safeProxyFactoryAddress = await deploySingleton(factoryAddress, SafeProxyFactory.bytecode, deployer);
  const UniFiPluginAddress = await deployFallbackSingleton(factoryAddress, spokePool, deployer);

  return {
    safeMastercopyAddress,
    safeProxyFactoryAddress,
    UniFiPluginAddress,
  }
}

export function getUniFiPluginBytecode(spokePool: string) {
  const moduleConstructor = AbiCoder.defaultAbiCoder().encode(['address'], [spokePool]);
  return UniFiPlugin.bytecode + moduleConstructor.slice(2);
}

export async function deployFallbackSingleton(factory: string, spokePool: string, deployer: SignerWithAddress) {
  const UniFiPluginBytecode = getUniFiPluginBytecode(spokePool);
  const UniFiPluginAddress = await deploySingleton(factory, UniFiPluginBytecode, deployer);

  return UniFiPluginAddress;
  
}

async function deploySingletonFactory(signer: SignerWithAddress) {
  const { chainId } = await signer.provider.getNetwork()
  const { address, signerAddress } = getSingletonFactoryInfo(Number(chainId)) as SingletonFactoryInfo

  // fund the presined transaction signer
  await signer.sendTransaction({
    to: signerAddress,
    value: parseUnits("1", 18),
  })

  // shoot the presigned transaction
  // await signer.provider.broadcastTransaction(transaction)

  return address
}

export async function deploySingleton(factory: string, bytecode: string, signer: SignerWithAddress) {
  const salt = ZeroHash

  const address = getCreate2Address(factory, salt, keccak256(bytecode))

  try {
    const deployedCode = await signer.provider.getCode(address)
    if (deployedCode !== "0x") {
      console.log(`Singleton at ${address} already deployed`)
      return address
    } else {
      console.log(`Deploying singleton at ${address}`)
    }
  } catch {}
  
  await signer.sendTransaction({
    to: factory,
    data: `${salt}${bytecode.slice(2)}`,
    value: 0,
  })

  return address
}
