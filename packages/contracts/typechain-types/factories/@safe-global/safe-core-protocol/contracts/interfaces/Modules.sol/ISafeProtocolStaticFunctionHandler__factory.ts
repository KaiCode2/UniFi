/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISafeProtocolStaticFunctionHandler,
  ISafeProtocolStaticFunctionHandlerInterface,
} from "../../../../../../@safe-global/safe-core-protocol/contracts/interfaces/Modules.sol/ISafeProtocolStaticFunctionHandler";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISafe",
        name: "safe",
        type: "address",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metadataProvider",
    outputs: [
      {
        internalType: "uint256",
        name: "providerType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "location",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ISafeProtocolStaticFunctionHandler__factory {
  static readonly abi = _abi;
  static createInterface(): ISafeProtocolStaticFunctionHandlerInterface {
    return new Interface(_abi) as ISafeProtocolStaticFunctionHandlerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISafeProtocolStaticFunctionHandler {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ISafeProtocolStaticFunctionHandler;
  }
}