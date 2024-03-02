// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {HandlerContext} from "@safe-global/safe-contracts/contracts/handler/HandlerContext.sol";
import {CompatibilityFallbackHandler} from "@safe-global/safe-contracts/contracts/handler/CompatibilityFallbackHandler.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";
import {TokenFallback} from "../libraries/TokenFallback.sol";
import {IFallbackRegister} from "../interfaces/IFallbackRegister.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import {MessageHashUtils} from "@openzeppelin/contracts-v5/utils/cryptography/MessageHashUtils.sol";
import {ECDSA} from "@openzeppelin/contracts-v5/utils/cryptography/ECDSA.sol";
import {IOwnerManager} from "../interfaces/IOwnerManager.sol";
import {BytesLib} from "../libraries/BytesLib.sol";

abstract contract BridgeFallbackHandler is
    CompatibilityFallbackHandler,
    HandlerContext,
    AcrossHookReceiver
{
    using TokenFallback for TokenFallback.FallbackData;
    using BytesLib for bytes;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Events
    //  ─────────────────────────────────────────────────────────────────────────────

    event TokensBridged(address indexed token, uint256 amount, bytes output);

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Omnaccount token bridge fallback register
    IFallbackRegister public fallbackRegister;

    // address public constant signMessageLib;

    /// @notice EIP-712 typehash for the bridge calls
    bytes32 public constant BRIDGE_CALL_TYPEHASH =
        keccak256("BridgeCall(address[] targets,bytes[] data,uint256 nonce)");

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(
        address _spokePool,
        address _fallbackRegister //,
        // address _signMessageLib
    ) AcrossHookReceiver(_spokePool) {
        // signMessageLib = _signMessageLib;
        fallbackRegister = IFallbackRegister(_fallbackRegister);
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Bridge Receiver Implementation
    //  ─────────────────────────────────────────────────────────────────────────────

    function _afterTokensBridged(
        address token,
        uint256 amount,
        bytes memory message
    ) internal override {
        ISafe safe = ISafe(msg.sender);
        // 1. Validate the message
        if (message.length == 0) {
            // If length is 0, check for a fallback handler
            (
                bool exists,
                TokenFallback.FallbackData memory fallbackData
            ) = fallbackRegister.getFallback(address(this), token);
            if (exists) {
                (bool success, bytes memory output) = fallbackData.target.call(
                    fallbackData.encode(token, amount)
                );
                require(success);
                message = output;
            }
        } else {
            // TODO: No authorization is being checked here. Implement it
            // Using ISafe.checkSignatures
            // If length is not 0, validate message is authorized then execute the message's calldata

            // TODO: Validate nonce matches expected
            (
                address[] memory targets,
                bytes[] memory data,
                uint256 nonce,
                bytes memory signatures
            ) = abi.decode(message, (address[], bytes[], uint256, bytes));
            bytes32[] memory dataHashes = new bytes32[](data.length);
            for (uint256 i = 0; i < data.length; i++) {
                dataHashes[i] = keccak256(data[i]);
            }
            bytes32 structHash = keccak256(
                abi.encode(BRIDGE_CALL_TYPEHASH, _hashArray(targets), _hashArray(dataHashes), nonce)
            );

            bytes32 typedDataHash = MessageHashUtils.toTypedDataHash(
                safe.domainSeparator(),
                structHash
            );

            IOwnerManager ownerManager = IOwnerManager(msg.sender);
            uint256 threshold = ownerManager.getThreshold();
            for (uint256 i = 0; i < threshold; i++) {
                bytes memory register = signatures.slice(i*65, (i+1)*65);
                address recovered = ECDSA.recover(typedDataHash, register);
                require(ownerManager.isOwner(recovered));
            }
            
            for (uint256 i = 0; i < targets.length; i++) {
                // NOTE: Calls are execute as delegate calls
                (bool success, bytes memory output) = safe
                    .execTransactionFromModuleReturnData(
                        targets[i],
                        0,
                        data[i],
                        0
                    );
                require(success);
                message = output;
            }
        }

        // 2. Execute the message's calldata
        emit TokensBridged(token, amount, message);
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Internal Utilities
    //  ─────────────────────────────────────────────────────────────────────────────

    function _hashArray(
        bytes32[] memory arr
    ) internal pure returns (bytes32 result) {
        assembly ("memory-safe") {
            result := keccak256(add(0x20, arr), shl(5, mload(arr)))
        }
    }

    function _hashArray(
        address[] memory arr
    ) internal pure returns (bytes32 result) {
        assembly ("memory-safe") {
            result := keccak256(add(0x20, arr), shl(5, mload(arr)))
        }
    }
}
