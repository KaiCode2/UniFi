/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace TokenFallback {
  export type FallbackDataStruct = {
    target: AddressLike;
    selector: BytesLike;
    tokenAddressIndex: BigNumberish;
    amountIndex: BigNumberish;
    vaultAddressIndex: BigNumberish;
    data: BytesLike;
  };

  export type FallbackDataStructOutput = [
    target: string,
    selector: string,
    tokenAddressIndex: bigint,
    amountIndex: bigint,
    vaultAddressIndex: bigint,
    data: string
  ] & {
    target: string;
    selector: string;
    tokenAddressIndex: bigint;
    amountIndex: bigint;
    vaultAddressIndex: bigint;
    data: string;
  };
}

export interface BridgeFallbackHandlerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ACROSS_BRIDGE"
      | "BRIDGE_CALL_TYPEHASH"
      | "bridgeFallbacks"
      | "encodeMessageDataForSafe"
      | "getFallback"
      | "getMessageHash"
      | "getMessageHashForSafe"
      | "getModules"
      | "handleAcrossMessage"
      | "handleV3AcrossMessage"
      | "isValidSignature(bytes32,bytes)"
      | "isValidSignature(bytes,bytes)"
      | "metadataHash"
      | "metadataProvider"
      | "name"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "onERC721Received"
      | "removeTokenFallback"
      | "requiresPermissions"
      | "requiresRootAccess"
      | "setTokenFallback"
      | "simulate"
      | "supportsInterface"
      | "tokensReceived"
      | "version"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Metadata"
      | "TokenFallbackAdded"
      | "TokenFallbackRemoved"
      | "TokensBridged"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ACROSS_BRIDGE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "BRIDGE_CALL_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bridgeFallbacks",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeMessageDataForSafe",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getFallback",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHashForSafe",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getModules",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "handleAcrossMessage",
    values: [AddressLike, BigNumberish, boolean, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "handleV3AcrossMessage",
    values: [AddressLike, BigNumberish, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature(bytes32,bytes)",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSignature(bytes,bytes)",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "metadataHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "metadataProvider",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish[],
      BigNumberish[],
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeTokenFallback",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requiresPermissions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requiresRootAccess",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenFallback",
    values: [AddressLike, TokenFallback.FallbackDataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "simulate",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokensReceived",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "ACROSS_BRIDGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "BRIDGE_CALL_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bridgeFallbacks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeMessageDataForSafe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHashForSafe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getModules", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "handleAcrossMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleV3AcrossMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature(bytes32,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature(bytes,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "metadataHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "metadataProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeTokenFallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiresPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requiresRootAccess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenFallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "simulate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export namespace MetadataEvent {
  export type InputTuple = [metadataHash: BytesLike, data: BytesLike];
  export type OutputTuple = [metadataHash: string, data: string];
  export interface OutputObject {
    metadataHash: string;
    data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenFallbackAddedEvent {
  export type InputTuple = [
    safe: AddressLike,
    token: AddressLike,
    fallbackData: TokenFallback.FallbackDataStruct
  ];
  export type OutputTuple = [
    safe: string,
    token: string,
    fallbackData: TokenFallback.FallbackDataStructOutput
  ];
  export interface OutputObject {
    safe: string;
    token: string;
    fallbackData: TokenFallback.FallbackDataStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenFallbackRemovedEvent {
  export type InputTuple = [safe: AddressLike, token: AddressLike];
  export type OutputTuple = [safe: string, token: string];
  export interface OutputObject {
    safe: string;
    token: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensBridgedEvent {
  export type InputTuple = [
    token: AddressLike,
    amount: BigNumberish,
    output: BytesLike
  ];
  export type OutputTuple = [token: string, amount: bigint, output: string];
  export interface OutputObject {
    token: string;
    amount: bigint;
    output: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BridgeFallbackHandler extends BaseContract {
  connect(runner?: ContractRunner | null): BridgeFallbackHandler;
  waitForDeployment(): Promise<this>;

  interface: BridgeFallbackHandlerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  ACROSS_BRIDGE: TypedContractMethod<[], [string], "view">;

  BRIDGE_CALL_TYPEHASH: TypedContractMethod<[], [string], "view">;

  bridgeFallbacks: TypedContractMethod<
    [safe: AddressLike, token: AddressLike],
    [
      [string, string, bigint, bigint, bigint, string] & {
        target: string;
        selector: string;
        tokenAddressIndex: bigint;
        amountIndex: bigint;
        vaultAddressIndex: bigint;
        data: string;
      }
    ],
    "view"
  >;

  encodeMessageDataForSafe: TypedContractMethod<
    [safe: AddressLike, message: BytesLike],
    [string],
    "view"
  >;

  getFallback: TypedContractMethod<
    [safe: AddressLike, token: AddressLike],
    [
      [boolean, TokenFallback.FallbackDataStructOutput] & {
        exists: boolean;
        fallbackData: TokenFallback.FallbackDataStructOutput;
      }
    ],
    "view"
  >;

  getMessageHash: TypedContractMethod<[message: BytesLike], [string], "view">;

  getMessageHashForSafe: TypedContractMethod<
    [safe: AddressLike, message: BytesLike],
    [string],
    "view"
  >;

  getModules: TypedContractMethod<[], [string[]], "view">;

  handleAcrossMessage: TypedContractMethod<
    [
      tokenSent: AddressLike,
      amount: BigNumberish,
      arg2: boolean,
      arg3: AddressLike,
      message: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  handleV3AcrossMessage: TypedContractMethod<
    [
      tokenSent: AddressLike,
      amount: BigNumberish,
      arg2: AddressLike,
      message: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  "isValidSignature(bytes32,bytes)": TypedContractMethod<
    [_dataHash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;

  "isValidSignature(bytes,bytes)": TypedContractMethod<
    [_data: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;

  metadataHash: TypedContractMethod<[], [string], "view">;

  metadataProvider: TypedContractMethod<
    [],
    [[bigint, string] & { providerType: bigint; location: string }],
    "view"
  >;

  name: TypedContractMethod<[], [string], "view">;

  onERC1155BatchReceived: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike
    ],
    [string],
    "view"
  >;

  onERC1155Received: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike
    ],
    [string],
    "view"
  >;

  onERC721Received: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;

  removeTokenFallback: TypedContractMethod<
    [token: AddressLike],
    [void],
    "nonpayable"
  >;

  requiresPermissions: TypedContractMethod<[], [bigint], "view">;

  requiresRootAccess: TypedContractMethod<[], [boolean], "view">;

  setTokenFallback: TypedContractMethod<
    [token: AddressLike, fallbackData: TokenFallback.FallbackDataStruct],
    [void],
    "nonpayable"
  >;

  simulate: TypedContractMethod<
    [targetContract: AddressLike, calldataPayload: BytesLike],
    [string],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  tokensReceived: TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish,
      arg4: BytesLike,
      arg5: BytesLike
    ],
    [void],
    "view"
  >;

  version: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ACROSS_BRIDGE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "BRIDGE_CALL_TYPEHASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "bridgeFallbacks"
  ): TypedContractMethod<
    [safe: AddressLike, token: AddressLike],
    [
      [string, string, bigint, bigint, bigint, string] & {
        target: string;
        selector: string;
        tokenAddressIndex: bigint;
        amountIndex: bigint;
        vaultAddressIndex: bigint;
        data: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "encodeMessageDataForSafe"
  ): TypedContractMethod<
    [safe: AddressLike, message: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getFallback"
  ): TypedContractMethod<
    [safe: AddressLike, token: AddressLike],
    [
      [boolean, TokenFallback.FallbackDataStructOutput] & {
        exists: boolean;
        fallbackData: TokenFallback.FallbackDataStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getMessageHash"
  ): TypedContractMethod<[message: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getMessageHashForSafe"
  ): TypedContractMethod<
    [safe: AddressLike, message: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getModules"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "handleAcrossMessage"
  ): TypedContractMethod<
    [
      tokenSent: AddressLike,
      amount: BigNumberish,
      arg2: boolean,
      arg3: AddressLike,
      message: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "handleV3AcrossMessage"
  ): TypedContractMethod<
    [
      tokenSent: AddressLike,
      amount: BigNumberish,
      arg2: AddressLike,
      message: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isValidSignature(bytes32,bytes)"
  ): TypedContractMethod<
    [_dataHash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "isValidSignature(bytes,bytes)"
  ): TypedContractMethod<
    [_data: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "metadataHash"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "metadataProvider"
  ): TypedContractMethod<
    [],
    [[bigint, string] & { providerType: bigint; location: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "onERC1155BatchReceived"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "onERC1155Received"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "onERC721Received"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BigNumberish, arg3: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "removeTokenFallback"
  ): TypedContractMethod<[token: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "requiresPermissions"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "requiresRootAccess"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "setTokenFallback"
  ): TypedContractMethod<
    [token: AddressLike, fallbackData: TokenFallback.FallbackDataStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "simulate"
  ): TypedContractMethod<
    [targetContract: AddressLike, calldataPayload: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "tokensReceived"
  ): TypedContractMethod<
    [
      arg0: AddressLike,
      arg1: AddressLike,
      arg2: AddressLike,
      arg3: BigNumberish,
      arg4: BytesLike,
      arg5: BytesLike
    ],
    [void],
    "view"
  >;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "Metadata"
  ): TypedContractEvent<
    MetadataEvent.InputTuple,
    MetadataEvent.OutputTuple,
    MetadataEvent.OutputObject
  >;
  getEvent(
    key: "TokenFallbackAdded"
  ): TypedContractEvent<
    TokenFallbackAddedEvent.InputTuple,
    TokenFallbackAddedEvent.OutputTuple,
    TokenFallbackAddedEvent.OutputObject
  >;
  getEvent(
    key: "TokenFallbackRemoved"
  ): TypedContractEvent<
    TokenFallbackRemovedEvent.InputTuple,
    TokenFallbackRemovedEvent.OutputTuple,
    TokenFallbackRemovedEvent.OutputObject
  >;
  getEvent(
    key: "TokensBridged"
  ): TypedContractEvent<
    TokensBridgedEvent.InputTuple,
    TokensBridgedEvent.OutputTuple,
    TokensBridgedEvent.OutputObject
  >;

  filters: {
    "Metadata(bytes32,bytes)": TypedContractEvent<
      MetadataEvent.InputTuple,
      MetadataEvent.OutputTuple,
      MetadataEvent.OutputObject
    >;
    Metadata: TypedContractEvent<
      MetadataEvent.InputTuple,
      MetadataEvent.OutputTuple,
      MetadataEvent.OutputObject
    >;

    "TokenFallbackAdded(address,address,tuple)": TypedContractEvent<
      TokenFallbackAddedEvent.InputTuple,
      TokenFallbackAddedEvent.OutputTuple,
      TokenFallbackAddedEvent.OutputObject
    >;
    TokenFallbackAdded: TypedContractEvent<
      TokenFallbackAddedEvent.InputTuple,
      TokenFallbackAddedEvent.OutputTuple,
      TokenFallbackAddedEvent.OutputObject
    >;

    "TokenFallbackRemoved(address,address)": TypedContractEvent<
      TokenFallbackRemovedEvent.InputTuple,
      TokenFallbackRemovedEvent.OutputTuple,
      TokenFallbackRemovedEvent.OutputObject
    >;
    TokenFallbackRemoved: TypedContractEvent<
      TokenFallbackRemovedEvent.InputTuple,
      TokenFallbackRemovedEvent.OutputTuple,
      TokenFallbackRemovedEvent.OutputObject
    >;

    "TokensBridged(address,uint256,bytes)": TypedContractEvent<
      TokensBridgedEvent.InputTuple,
      TokensBridgedEvent.OutputTuple,
      TokensBridgedEvent.OutputObject
    >;
    TokensBridged: TypedContractEvent<
      TokensBridgedEvent.InputTuple,
      TokensBridgedEvent.OutputTuple,
      TokensBridgedEvent.OutputObject
    >;
  };
}