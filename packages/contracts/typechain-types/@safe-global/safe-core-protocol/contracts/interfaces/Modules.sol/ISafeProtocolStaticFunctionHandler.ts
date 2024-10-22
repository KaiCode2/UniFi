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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../../../common";

export interface ISafeProtocolStaticFunctionHandlerInterface extends Interface {
  getFunction(
    nameOrSignature: "handle" | "metadataProvider" | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "handle",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "metadataProvider",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "handle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "metadataProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
}

export interface ISafeProtocolStaticFunctionHandler extends BaseContract {
  connect(runner?: ContractRunner | null): ISafeProtocolStaticFunctionHandler;
  waitForDeployment(): Promise<this>;

  interface: ISafeProtocolStaticFunctionHandlerInterface;

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

  handle: TypedContractMethod<
    [
      safe: AddressLike,
      sender: AddressLike,
      value: BigNumberish,
      data: BytesLike
    ],
    [string],
    "view"
  >;

  metadataProvider: TypedContractMethod<
    [],
    [[bigint, string] & { providerType: bigint; location: string }],
    "view"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "handle"
  ): TypedContractMethod<
    [
      safe: AddressLike,
      sender: AddressLike,
      value: BigNumberish,
      data: BytesLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "metadataProvider"
  ): TypedContractMethod<
    [],
    [[bigint, string] & { providerType: bigint; location: string }],
    "view"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;

  filters: {};
}
