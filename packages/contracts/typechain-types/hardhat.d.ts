/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IAccount",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccount__factory>;
    getContractFactory(
      name: "SpokePoolInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SpokePoolInterface__factory>;
    getContractFactory(
      name: "V3SpokePoolInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.V3SpokePoolInterface__factory>;
    getContractFactory(
      name: "CCIPReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CCIPReceiver__factory>;
    getContractFactory(
      name: "IAny2EVMMessageReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver__factory>;
    getContractFactory(
      name: "Client",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Client__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Address",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Address__factory>;
    getContractFactory(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ECDSA__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Math",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Math__factory>;
    getContractFactory(
      name: "Strings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Strings__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "FallbackManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FallbackManager__factory>;
    getContractFactory(
      name: "BaseGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseGuard__factory>;
    getContractFactory(
      name: "Guard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Guard__factory>;
    getContractFactory(
      name: "GuardManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GuardManager__factory>;
    getContractFactory(
      name: "ModuleManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ModuleManager__factory>;
    getContractFactory(
      name: "OwnerManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnerManager__factory>;
    getContractFactory(
      name: "NativeCurrencyPaymentFallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NativeCurrencyPaymentFallback__factory>;
    getContractFactory(
      name: "StorageAccessible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StorageAccessible__factory>;
    getContractFactory(
      name: "CompatibilityFallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CompatibilityFallbackHandler__factory>;
    getContractFactory(
      name: "TokenCallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenCallbackHandler__factory>;
    getContractFactory(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TokenReceiver__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "ERC777TokensRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777TokensRecipient__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ISignatureValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISignatureValidator__factory>;
    getContractFactory(
      name: "Safe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Safe__factory>;
    getContractFactory(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafe__factory>;
    getContractFactory(
      name: "ISafeProtocolFunctionHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafeProtocolFunctionHandler__factory>;
    getContractFactory(
      name: "ISafeProtocolHooks",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafeProtocolHooks__factory>;
    getContractFactory(
      name: "ISafeProtocolPlugin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafeProtocolPlugin__factory>;
    getContractFactory(
      name: "ISafeProtocolStaticFunctionHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafeProtocolStaticFunctionHandler__factory>;
    getContractFactory(
      name: "AcrossHookReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AcrossHookReceiver__factory>;
    getContractFactory(
      name: "AcrossSender",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AcrossSender__factory>;
    getContractFactory(
      name: "CCIPHookReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CCIPHookReceiver__factory>;
    getContractFactory(
      name: "OmnaccountErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OmnaccountErrors__factory>;
    getContractFactory(
      name: "IAcrossMessageHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAcrossMessageHandler__factory>;
    getContractFactory(
      name: "IFallbackRegister",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFallbackRegister__factory>;
    getContractFactory(
      name: "IOwnerManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOwnerManager__factory>;
    getContractFactory(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISafe__factory>;
    getContractFactory(
      name: "OmnaccountModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OmnaccountModule__factory>;
    getContractFactory(
      name: "Relayer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Relayer__factory>;
    getContractFactory(
      name: "V3SpokePoolInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.V3SpokePoolInterface__factory>;
    getContractFactory(
      name: "BasePlugin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasePlugin__factory>;
    getContractFactory(
      name: "BasePluginWithEventMetadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasePluginWithEventMetadata__factory>;
    getContractFactory(
      name: "BasePluginWithStoredMetadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasePluginWithStoredMetadata__factory>;
    getContractFactory(
      name: "IMetadataProvider",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMetadataProvider__factory>;
    getContractFactory(
      name: "BaseModule",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseModule__factory>;
    getContractFactory(
      name: "BridgeFallbackHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BridgeFallbackHandler__factory>;
    getContractFactory(
      name: "UniFiPlugin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UniFiPlugin__factory>;

    getContractAt(
      name: "IAccount",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccount>;
    getContractAt(
      name: "SpokePoolInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SpokePoolInterface>;
    getContractAt(
      name: "V3SpokePoolInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.V3SpokePoolInterface>;
    getContractAt(
      name: "CCIPReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CCIPReceiver>;
    getContractAt(
      name: "IAny2EVMMessageReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    getContractAt(
      name: "Client",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Client>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Address",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Address>;
    getContractAt(
      name: "ECDSA",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ECDSA>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "Math",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Math>;
    getContractAt(
      name: "Strings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Strings>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "FallbackManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.FallbackManager>;
    getContractAt(
      name: "BaseGuard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseGuard>;
    getContractAt(
      name: "Guard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Guard>;
    getContractAt(
      name: "GuardManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.GuardManager>;
    getContractAt(
      name: "ModuleManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ModuleManager>;
    getContractAt(
      name: "OwnerManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnerManager>;
    getContractAt(
      name: "NativeCurrencyPaymentFallback",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.NativeCurrencyPaymentFallback>;
    getContractAt(
      name: "StorageAccessible",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.StorageAccessible>;
    getContractAt(
      name: "CompatibilityFallbackHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CompatibilityFallbackHandler>;
    getContractAt(
      name: "TokenCallbackHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenCallbackHandler>;
    getContractAt(
      name: "ERC1155TokenReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TokenReceiver>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "ERC777TokensRecipient",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC777TokensRecipient>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ISignatureValidator",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISignatureValidator>;
    getContractAt(
      name: "Safe",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Safe>;
    getContractAt(
      name: "ISafe",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafe>;
    getContractAt(
      name: "ISafeProtocolFunctionHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafeProtocolFunctionHandler>;
    getContractAt(
      name: "ISafeProtocolHooks",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafeProtocolHooks>;
    getContractAt(
      name: "ISafeProtocolPlugin",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafeProtocolPlugin>;
    getContractAt(
      name: "ISafeProtocolStaticFunctionHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafeProtocolStaticFunctionHandler>;
    getContractAt(
      name: "AcrossHookReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AcrossHookReceiver>;
    getContractAt(
      name: "AcrossSender",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AcrossSender>;
    getContractAt(
      name: "CCIPHookReceiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.CCIPHookReceiver>;
    getContractAt(
      name: "OmnaccountErrors",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OmnaccountErrors>;
    getContractAt(
      name: "IAcrossMessageHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAcrossMessageHandler>;
    getContractAt(
      name: "IFallbackRegister",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IFallbackRegister>;
    getContractAt(
      name: "IOwnerManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOwnerManager>;
    getContractAt(
      name: "ISafe",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISafe>;
    getContractAt(
      name: "OmnaccountModule",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OmnaccountModule>;
    getContractAt(
      name: "Relayer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Relayer>;
    getContractAt(
      name: "V3SpokePoolInterface",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.V3SpokePoolInterface>;
    getContractAt(
      name: "BasePlugin",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BasePlugin>;
    getContractAt(
      name: "BasePluginWithEventMetadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BasePluginWithEventMetadata>;
    getContractAt(
      name: "BasePluginWithStoredMetadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BasePluginWithStoredMetadata>;
    getContractAt(
      name: "IMetadataProvider",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IMetadataProvider>;
    getContractAt(
      name: "BaseModule",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseModule>;
    getContractAt(
      name: "BridgeFallbackHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BridgeFallbackHandler>;
    getContractAt(
      name: "UniFiPlugin",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.UniFiPlugin>;

    deployContract(
      name: "IAccount",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccount>;
    deployContract(
      name: "SpokePoolInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SpokePoolInterface>;
    deployContract(
      name: "V3SpokePoolInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.V3SpokePoolInterface>;
    deployContract(
      name: "CCIPReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPReceiver>;
    deployContract(
      name: "IAny2EVMMessageReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    deployContract(
      name: "Client",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Client>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "Address",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Address>;
    deployContract(
      name: "ECDSA",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "Strings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "FallbackManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FallbackManager>;
    deployContract(
      name: "BaseGuard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BaseGuard>;
    deployContract(
      name: "Guard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Guard>;
    deployContract(
      name: "GuardManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.GuardManager>;
    deployContract(
      name: "ModuleManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ModuleManager>;
    deployContract(
      name: "OwnerManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnerManager>;
    deployContract(
      name: "NativeCurrencyPaymentFallback",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.NativeCurrencyPaymentFallback>;
    deployContract(
      name: "StorageAccessible",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.StorageAccessible>;
    deployContract(
      name: "CompatibilityFallbackHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CompatibilityFallbackHandler>;
    deployContract(
      name: "TokenCallbackHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenCallbackHandler>;
    deployContract(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1155TokenReceiver>;
    deployContract(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721TokenReceiver>;
    deployContract(
      name: "ERC777TokensRecipient",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC777TokensRecipient>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "ISignatureValidator",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISignatureValidator>;
    deployContract(
      name: "Safe",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Safe>;
    deployContract(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafe>;
    deployContract(
      name: "ISafeProtocolFunctionHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolFunctionHandler>;
    deployContract(
      name: "ISafeProtocolHooks",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolHooks>;
    deployContract(
      name: "ISafeProtocolPlugin",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolPlugin>;
    deployContract(
      name: "ISafeProtocolStaticFunctionHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolStaticFunctionHandler>;
    deployContract(
      name: "AcrossHookReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AcrossHookReceiver>;
    deployContract(
      name: "AcrossSender",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AcrossSender>;
    deployContract(
      name: "CCIPHookReceiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPHookReceiver>;
    deployContract(
      name: "OmnaccountErrors",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OmnaccountErrors>;
    deployContract(
      name: "IAcrossMessageHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAcrossMessageHandler>;
    deployContract(
      name: "IFallbackRegister",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFallbackRegister>;
    deployContract(
      name: "IOwnerManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnerManager>;
    deployContract(
      name: "ISafe",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafe>;
    deployContract(
      name: "OmnaccountModule",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OmnaccountModule>;
    deployContract(
      name: "Relayer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Relayer>;
    deployContract(
      name: "V3SpokePoolInterface",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.V3SpokePoolInterface>;
    deployContract(
      name: "BasePlugin",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePlugin>;
    deployContract(
      name: "BasePluginWithEventMetadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePluginWithEventMetadata>;
    deployContract(
      name: "BasePluginWithStoredMetadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePluginWithStoredMetadata>;
    deployContract(
      name: "IMetadataProvider",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IMetadataProvider>;
    deployContract(
      name: "BaseModule",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BaseModule>;
    deployContract(
      name: "BridgeFallbackHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BridgeFallbackHandler>;
    deployContract(
      name: "UniFiPlugin",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UniFiPlugin>;

    deployContract(
      name: "IAccount",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAccount>;
    deployContract(
      name: "SpokePoolInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SpokePoolInterface>;
    deployContract(
      name: "V3SpokePoolInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.V3SpokePoolInterface>;
    deployContract(
      name: "CCIPReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPReceiver>;
    deployContract(
      name: "IAny2EVMMessageReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAny2EVMMessageReceiver>;
    deployContract(
      name: "Client",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Client>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "Address",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Address>;
    deployContract(
      name: "ECDSA",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ECDSA>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "Math",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Math>;
    deployContract(
      name: "Strings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Strings>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "FallbackManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.FallbackManager>;
    deployContract(
      name: "BaseGuard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BaseGuard>;
    deployContract(
      name: "Guard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Guard>;
    deployContract(
      name: "GuardManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.GuardManager>;
    deployContract(
      name: "ModuleManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ModuleManager>;
    deployContract(
      name: "OwnerManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OwnerManager>;
    deployContract(
      name: "NativeCurrencyPaymentFallback",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.NativeCurrencyPaymentFallback>;
    deployContract(
      name: "StorageAccessible",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.StorageAccessible>;
    deployContract(
      name: "CompatibilityFallbackHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CompatibilityFallbackHandler>;
    deployContract(
      name: "TokenCallbackHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenCallbackHandler>;
    deployContract(
      name: "ERC1155TokenReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC1155TokenReceiver>;
    deployContract(
      name: "ERC721TokenReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721TokenReceiver>;
    deployContract(
      name: "ERC777TokensRecipient",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC777TokensRecipient>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "ISignatureValidator",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISignatureValidator>;
    deployContract(
      name: "Safe",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Safe>;
    deployContract(
      name: "ISafe",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafe>;
    deployContract(
      name: "ISafeProtocolFunctionHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolFunctionHandler>;
    deployContract(
      name: "ISafeProtocolHooks",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolHooks>;
    deployContract(
      name: "ISafeProtocolPlugin",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolPlugin>;
    deployContract(
      name: "ISafeProtocolStaticFunctionHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafeProtocolStaticFunctionHandler>;
    deployContract(
      name: "AcrossHookReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AcrossHookReceiver>;
    deployContract(
      name: "AcrossSender",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AcrossSender>;
    deployContract(
      name: "CCIPHookReceiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.CCIPHookReceiver>;
    deployContract(
      name: "OmnaccountErrors",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OmnaccountErrors>;
    deployContract(
      name: "IAcrossMessageHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAcrossMessageHandler>;
    deployContract(
      name: "IFallbackRegister",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IFallbackRegister>;
    deployContract(
      name: "IOwnerManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnerManager>;
    deployContract(
      name: "ISafe",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISafe>;
    deployContract(
      name: "OmnaccountModule",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.OmnaccountModule>;
    deployContract(
      name: "Relayer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Relayer>;
    deployContract(
      name: "V3SpokePoolInterface",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.V3SpokePoolInterface>;
    deployContract(
      name: "BasePlugin",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePlugin>;
    deployContract(
      name: "BasePluginWithEventMetadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePluginWithEventMetadata>;
    deployContract(
      name: "BasePluginWithStoredMetadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BasePluginWithStoredMetadata>;
    deployContract(
      name: "IMetadataProvider",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IMetadataProvider>;
    deployContract(
      name: "BaseModule",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BaseModule>;
    deployContract(
      name: "BridgeFallbackHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BridgeFallbackHandler>;
    deployContract(
      name: "UniFiPlugin",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UniFiPlugin>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
