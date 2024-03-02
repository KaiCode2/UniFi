import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { AbiCoder, concat, getCreate2Address, Interface, keccak256, ZeroAddress, ZeroHash } from 'ethers'

import Safe from '@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json'
import SafeProxy from '@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxy.sol/SafeProxy.json'
import SafeProxyFactory from '@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json'

export default async function deploySafeProxy(
  factory: string,
  mastercopy: string,
  owner: string,
  deployer: SignerWithAddress,
  fallback?: string,
  module?: string,
  moduleSetup?: string
): Promise<string> {
  const initializer = calculateInitializer(owner, fallback, module, moduleSetup)

  const proxyAddress = calculateProxyAddress(initializer, factory, mastercopy)

  try {
    const deployedCode = await deployer.provider.getCode(proxyAddress)
    if (deployedCode !== '0x') {
      console.log(`Safe at ${proxyAddress} already deployed`)
      return proxyAddress
    }
  } catch {}

  const iface = new Interface(SafeProxyFactory.abi)
  await deployer.sendTransaction({
    to: factory,
    data: iface.encodeFunctionData('createProxyWithNonce', [mastercopy, initializer, ZeroHash]),
  })

  return calculateProxyAddress(initializer, factory, mastercopy)
}

export function calculateInitializer(owner: string, fallback?: string, module?: string, moduleSetup?: string): string {
  const iface = new Interface(Safe.abi)

  const initializer = iface.encodeFunctionData('setup', [
    [owner], // owners
    1, // threshold
    module ? module : ZeroAddress, // to - for setupModules
    moduleSetup ? moduleSetup : '0x', // data - for setupModules
    fallback ? fallback : ZeroAddress, // fallbackHandler
    ZeroAddress, // paymentToken
    0, // payment
    ZeroAddress, // paymentReceiver
  ])

  return initializer
}

export function calculateProxyAddress(initializer: string, factory: string, mastercopy: string): string {
  const salt = keccak256(concat([keccak256(initializer), ZeroHash]))

  const deploymentData = concat([SafeProxy.bytecode, AbiCoder.defaultAbiCoder().encode(['address'], [mastercopy])])

  return getCreate2Address(factory, salt, keccak256(deploymentData))
}
