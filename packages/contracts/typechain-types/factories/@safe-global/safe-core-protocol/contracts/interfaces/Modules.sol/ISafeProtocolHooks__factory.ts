/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISafeProtocolHooks,
  ISafeProtocolHooksInterface,
} from "../../../../../../@safe-global/safe-core-protocol/contracts/interfaces/Modules.sol/ISafeProtocolHooks";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISafe",
        name: "safe",
        type: "address",
      },
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "preCheckData",
        type: "bytes",
      },
    ],
    name: "postCheck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISafe",
        name: "safe",
        type: "address",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "to",
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
            internalType: "struct SafeProtocolAction[]",
            name: "actions",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "metadataHash",
            type: "bytes32",
          },
        ],
        internalType: "struct SafeTransaction",
        name: "tx",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "executionType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "executionMeta",
        type: "bytes",
      },
    ],
    name: "preCheck",
    outputs: [
      {
        internalType: "bytes",
        name: "preCheckData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISafe",
        name: "safe",
        type: "address",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address payable",
                name: "to",
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
            internalType: "struct SafeProtocolAction",
            name: "action",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "metadataHash",
            type: "bytes32",
          },
        ],
        internalType: "struct SafeRootAccess",
        name: "rootAccess",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "executionType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "executionMeta",
        type: "bytes",
      },
    ],
    name: "preCheckRootAccess",
    outputs: [
      {
        internalType: "bytes",
        name: "preCheckData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
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

export class ISafeProtocolHooks__factory {
  static readonly abi = _abi;
  static createInterface(): ISafeProtocolHooksInterface {
    return new Interface(_abi) as ISafeProtocolHooksInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISafeProtocolHooks {
    return new Contract(address, _abi, runner) as unknown as ISafeProtocolHooks;
  }
}
