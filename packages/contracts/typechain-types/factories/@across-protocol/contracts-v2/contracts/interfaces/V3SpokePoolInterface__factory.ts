/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  V3SpokePoolInterface,
  V3SpokePoolInterfaceInterface,
} from "../../../../../@across-protocol/contracts-v2/contracts/interfaces/V3SpokePoolInterface";

const _abi = [
  {
    inputs: [],
    name: "ClaimedMerkleLeaf",
    type: "error",
  },
  {
    inputs: [],
    name: "DisabledRoute",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpiredFillDeadline",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidChainId",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidExclusiveRelayer",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidExclusivityDeadline",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidFillDeadline",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMerkleLeaf",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMerkleProof",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPayoutAdjustmentPct",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidQuoteTimestamp",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSlowFillRequest",
    type: "error",
  },
  {
    inputs: [],
    name: "MsgValueDoesNotMatchInputAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "NoSlowFillsInExclusivityWindow",
    type: "error",
  },
  {
    inputs: [],
    name: "NotExclusiveRelayer",
    type: "error",
  },
  {
    inputs: [],
    name: "RelayFilled",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inputAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "repaymentChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "originChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "depositId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "fillDeadline",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "exclusivityDeadline",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "exclusiveRelayer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "relayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        components: [
          {
            internalType: "address",
            name: "updatedRecipient",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "updatedMessage",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "updatedOutputAmount",
            type: "uint256",
          },
          {
            internalType: "enum V3SpokePoolInterface.FillType",
            name: "fillType",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct V3SpokePoolInterface.V3RelayExecutionEventInfo",
        name: "relayExecutionInfo",
        type: "tuple",
      },
    ],
    name: "FilledV3Relay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedOutputAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "depositId",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "updatedRecipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "updatedMessage",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "depositorSignature",
        type: "bytes",
      },
    ],
    name: "RequestedSpeedUpV3Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inputAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "originChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "depositId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "fillDeadline",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "exclusivityDeadline",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "exclusiveRelayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "RequestedV3SlowFill",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "inputAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "destinationChainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "depositId",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "quoteTimestamp",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "fillDeadline",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "exclusivityDeadline",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "exclusiveRelayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "V3FundsDeposited",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "inputToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "outputToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "inputAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "destinationChainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "exclusiveRelayer",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "quoteTimestamp",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "fillDeadline",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "exclusivityDeadline",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "depositV3",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "depositor",
                type: "address",
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "address",
                name: "exclusiveRelayer",
                type: "address",
              },
              {
                internalType: "address",
                name: "inputToken",
                type: "address",
              },
              {
                internalType: "address",
                name: "outputToken",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "inputAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "outputAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "originChainId",
                type: "uint256",
              },
              {
                internalType: "uint32",
                name: "depositId",
                type: "uint32",
              },
              {
                internalType: "uint32",
                name: "fillDeadline",
                type: "uint32",
              },
              {
                internalType: "uint32",
                name: "exclusivityDeadline",
                type: "uint32",
              },
              {
                internalType: "bytes",
                name: "message",
                type: "bytes",
              },
            ],
            internalType: "struct V3SpokePoolInterface.V3RelayData",
            name: "relayData",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedOutputAmount",
            type: "uint256",
          },
        ],
        internalType: "struct V3SpokePoolInterface.V3SlowFill",
        name: "slowFillLeaf",
        type: "tuple",
      },
      {
        internalType: "uint32",
        name: "rootBundleId",
        type: "uint32",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "executeV3SlowRelayLeaf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositor",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "exclusiveRelayer",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "outputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "originChainId",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "depositId",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "fillDeadline",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "exclusivityDeadline",
            type: "uint32",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct V3SpokePoolInterface.V3RelayData",
        name: "relayData",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "repaymentChainId",
        type: "uint256",
      },
    ],
    name: "fillV3Relay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositor",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "exclusiveRelayer",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "outputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "originChainId",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "depositId",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "fillDeadline",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "exclusivityDeadline",
            type: "uint32",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct V3SpokePoolInterface.V3RelayData",
        name: "relayData",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "repaymentChainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedOutputAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "updatedRecipient",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "updatedMessage",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "depositorSignature",
        type: "bytes",
      },
    ],
    name: "fillV3RelayWithUpdatedDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "depositor",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "exclusiveRelayer",
            type: "address",
          },
          {
            internalType: "address",
            name: "inputToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "outputToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "inputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "outputAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "originChainId",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "depositId",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "fillDeadline",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "exclusivityDeadline",
            type: "uint32",
          },
          {
            internalType: "bytes",
            name: "message",
            type: "bytes",
          },
        ],
        internalType: "struct V3SpokePoolInterface.V3RelayData",
        name: "relayData",
        type: "tuple",
      },
    ],
    name: "requestV3SlowFill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "depositId",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "updatedOutputAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "updatedRecipient",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "updatedMessage",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "depositorSignature",
        type: "bytes",
      },
    ],
    name: "speedUpV3Deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class V3SpokePoolInterface__factory {
  static readonly abi = _abi;
  static createInterface(): V3SpokePoolInterfaceInterface {
    return new Interface(_abi) as V3SpokePoolInterfaceInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): V3SpokePoolInterface {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as V3SpokePoolInterface;
  }
}