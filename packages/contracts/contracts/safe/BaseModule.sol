// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";

abstract contract BaseModule is IAccount {

    /**
     * @notice The EIP-712 type-hash for the domain separator used for verifying Safe operation signatures.
     * @dev keccak256("EIP712Domain(uint256 chainId,address verifyingContract)") = 0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218
     */
    bytes32 private constant DOMAIN_SEPARATOR_TYPEHASH = 0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218;

    /**
     * @notice The EIP-712 type-hash for a SafeOp, representing the structure of a User Operation for the Safe.
     *  {address} safe - The address of the safe on which the operation is performed.
     *  {uint256} nonce - A unique number associated with the user operation, preventing replay attacks by ensuring each operation is unique.
     *  {bytes} initCode - The packed encoding of a factory address and its factory-specific data for creating a new Safe account.
     *  {bytes} callData - The bytes representing the data of the function call to be executed.
     *  {uint256} callGasLimit - The maximum amount of gas allowed for executing the function call.
     *  {uint256} verificationGasLimit - The maximum amount of gas allowed for the verification process.
     *  {uint256} preVerificationGas - The amount of gas allocated for pre-verification steps before executing the main operation.
     *  {uint256} maxFeePerGas - The maximum fee per gas that the user is willing to pay for the transaction.
     *  {uint256} maxPriorityFeePerGas - The maximum priority fee per gas that the user is willing to pay for the transaction.
     *  {bytes} paymasterAndData - The packed encoding of a paymaster address and its paymaster-specific data for sponsoring the user operation.
     *  {uint48} validAfter - A timestamp representing from when the user operation is valid.
     *  {uint48} validUntil - A timestamp representing until when the user operation is valid, or 0 to indicated "forever".
     *  {address} entryPoint - The address of the entry point that will execute the user operation.
     * @dev When validating the user operation, the signature timestamps are pre-pended to the signature bytes.
     * keccak256(
            "SafeOp(address safe,uint256 nonce,bytes initCode,bytes callData,uint256 callGasLimit,uint256 verificationGasLimit,uint256 preVerificationGas,uint256 maxFeePerGas,uint256 maxPriorityFeePerGas,bytes paymasterAndData,uint48 validAfter,uint48 validUntil,address entryPoint)"
        ) = 0x84aa190356f56b8c87825f54884392a9907c23ee0f8e1ea86336b763faf021bd
     */
    bytes32 private constant SAFE_OP_TYPEHASH = 0x84aa190356f56b8c87825f54884392a9907c23ee0f8e1ea86336b763faf021bd;

    /**
     * @dev A structure used internally for manually encoding a Safe operation for when computing the EIP-712 struct hash.
     */
    struct EncodedSafeOpStruct {
        bytes32 typeHash;
        address safe;
        uint256 nonce;
        bytes32 initCodeHash;
        bytes32 callDataHash;
        uint256 callGasLimit;
        uint256 verificationGasLimit;
        uint256 preVerificationGas;
        uint256 maxFeePerGas;
        uint256 maxPriorityFeePerGas;
        bytes32 paymasterAndDataHash;
        uint48 validAfter;
        uint48 validUntil;
        address entryPoint;
    }

    /**
     * @notice The address of the EntryPoint contract supported by this module.
     */
    address public immutable SUPPORTED_ENTRYPOINT;

    constructor(address entryPoint) {
        if (entryPoint == address(0x0)) revert Errors.InvalidEntryPoint();

        SUPPORTED_ENTRYPOINT = entryPoint;
    }

    /**
     * @notice Validates the call is initiated by the entry point.
     */
    modifier onlySupportedEntryPoint() {
        if (_msgSender() != SUPPORTED_ENTRYPOINT) revert Errors.InvalidEntryPoint();

        _;
    }


}
