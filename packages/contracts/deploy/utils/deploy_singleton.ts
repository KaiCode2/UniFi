import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import { getSingletonFactoryInfo, SingletonFactoryInfo } from "@safe-global/safe-singleton-factory"
import { getCreate2Address, keccak256, parseUnits, ZeroHash, AbiCoder } from "ethers"

import OmnaccountModule from "@/artifacts/contracts/OmnaccountModule.sol/OmnaccountModule.json";
import Safe from "@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json"
import SafeProxyFactory from "@safe-global//safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json"

export default async function deploySingletons(deployer: SignerWithAddress, entrypoint: string, spokePool: string) {
  const factoryAddress = await deploySingletonFactory(deployer);
  const safeMastercopyAddress = await deploySingleton(factoryAddress, Safe.bytecode, deployer);
  const safeProxyFactoryAddress = await deploySingleton(factoryAddress, SafeProxyFactory.bytecode, deployer);
  const moduleConstructor = AbiCoder.defaultAbiCoder().encode(['address', 'address'], [entrypoint, spokePool]);
  const omnaccountModuleBytecode = OmnaccountModule.bytecode + moduleConstructor.slice(2);
  const omnaccountModuleAddress = await deploySingleton(factoryAddress, omnaccountModuleBytecode, deployer);

  return {
    safeMastercopyAddress,
    safeProxyFactoryAddress,
    omnaccountModuleAddress,
  }
}

async function deploySingletonFactory(signer: SignerWithAddress) {
  const { chainId } = await signer.provider.getNetwork()
  const { address, signerAddress, transaction } = getSingletonFactoryInfo(Number(chainId)) as SingletonFactoryInfo

  // fund the presined transaction signer
  await signer.sendTransaction({
    to: signerAddress,
    value: parseUnits("1", 18),
  })

  // shoot the presigned transaction
  await signer.provider.broadcastTransaction(transaction)

  return address
}

async function deploySingleton(factory: string, bytecode: string, signer: SignerWithAddress) {
  const salt = ZeroHash

  await signer.sendTransaction({
    to: factory,
    data: `${salt}${bytecode.slice(2)}`,
    value: 0,
  })

  return getCreate2Address(factory, salt, keccak256(bytecode))
}
