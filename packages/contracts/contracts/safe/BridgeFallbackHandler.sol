// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BasePlugin, BasePluginWithEventMetadata, PluginMetadata} from "./Base.sol";
import {HandlerContext} from "@safe-global/safe-contracts/contracts/handler/HandlerContext.sol";
import {CompatibilityFallbackHandler} from "@safe-global/safe-contracts/contracts/handler/CompatibilityFallbackHandler.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";
import {TokenFallback} from "../libraries/TokenFallback.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";
import {IFallbackRegister} from "../interfaces/IFallbackRegister.sol";
import {IFallbackRegister} from "../interfaces/IFallbackRegister.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import {MessageHashUtils} from "@openzeppelin/contracts-v5/utils/cryptography/MessageHashUtils.sol";
import {ECDSA} from "@openzeppelin/contracts-v5/utils/cryptography/ECDSA.sol";
import {IOwnerManager} from "../interfaces/IOwnerManager.sol";
import {BytesLib} from "../libraries/BytesLib.sol";
import {IERC165} from "@openzeppelin/contracts-v5/utils/introspection/IERC165.sol";
import {TokenCallbackHandler} from "@safe-global/safe-contracts/contracts/handler/TokenCallbackHandler.sol";

abstract contract BridgeFallbackHandler is
    CompatibilityFallbackHandler,
    HandlerContext,
    AcrossHookReceiver,
    BasePluginWithEventMetadata,
    IFallbackRegister,
    Errors
{
    using TokenFallback for TokenFallback.FallbackData;
    using BytesLib for bytes;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Events
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Emitted when tokens are bridged
    event TokensBridged(address indexed token, uint256 amount, bytes output);

    /// @notice Emitted when a token fallback is set
    event TokenFallbackAdded(address indexed safe, address indexed token, TokenFallback.FallbackData fallbackData);

    /// @notice Emitted when a token fallback is removed
    event TokenFallbackRemoved(address indexed safe, address indexed token);

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Maps Safe wallet to token address to default fallback behavior
    mapping (address safe => mapping(address token => TokenFallback.FallbackData)) public bridgeFallbacks;

    /// @notice EIP-712 typehash for the bridge calls
    bytes32 public constant BRIDGE_CALL_TYPEHASH =
        keccak256("BridgeCall(address[] targets,bytes[] data,uint256 nonce)");

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(
        address _spokePool
    ) 
        AcrossHookReceiver(_spokePool)
        BasePluginWithEventMetadata(
            PluginMetadata({name: "Unify Token Bridge", version: "1.0.0", requiresRootAccess: false, iconUrl: "", appUrl: ""})
        )
    {
        // no-op
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
            TokenFallback.FallbackData memory fallbackData = bridgeFallbacks[address(safe)][token];
            if (fallbackData.selector != bytes4(0x0)) {
                (bool success, bytes memory output) = fallbackData.target.call(
                    fallbackData.encode(token, amount, address(safe))
                );
                require(success);
                message = output;
            }
        } else {
            // If length is not 0, validate message is authorized then execute the message's calldata
            (
                address[] memory targets,
                bytes[] memory data,
                bytes memory signatures
            ) = abi.decode(message, (address[], bytes[], bytes));
            bytes32[] memory dataHashes = new bytes32[](data.length);
            for (uint256 i = 0; i < data.length; i++) {
                dataHashes[i] = keccak256(data[i]);
            }

            bytes32 structHash = keccak256(
                abi.encode(BRIDGE_CALL_TYPEHASH, _hashArray(targets), _hashArray(dataHashes), safe.nonce())
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
    //  Token Fallback Management
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @inheritdoc IFallbackRegister
    function getFallback(address safe, address token) external view returns (bool exists, TokenFallback.FallbackData memory fallbackData) {
        exists = bridgeFallbacks[safe][token].selector != bytes4(0x0);
        if (exists) {
            fallbackData = bridgeFallbacks[safe][token];
        }
    }

    /// @inheritdoc IFallbackRegister
    function setTokenFallback(address token, TokenFallback.FallbackData memory fallbackData) external {
        ISafe safe = ISafe(msg.sender);

        if (!safe.isModuleEnabled(address(this))) revert Errors.ModuleNotEnabled(address(safe));

        bridgeFallbacks[address(safe)][token] = fallbackData;

        emit TokenFallbackAdded(msg.sender, token, fallbackData);
    }

    /// @inheritdoc IFallbackRegister
    function removeTokenFallback(address token) external {
        ISafe safe = ISafe(msg.sender);

        if (!safe.isModuleEnabled(address(this))) revert Errors.ModuleNotEnabled(address(safe));

        delete bridgeFallbacks[address(safe)][token];

        emit TokenFallbackRemoved(msg.sender, token);
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Plugin
    //  ─────────────────────────────────────────────────────────────────────────────
    
    /// @dev Requires DELEGATE_CALL permission
    function requiresPermissions() external pure returns (uint8 permissions) {
        return 4;
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  ERC-165 Support
    //  ─────────────────────────────────────────────────────────────────────────────

    function supportsInterface(bytes4 interfaceId) public view virtual override(BasePlugin, TokenCallbackHandler) returns (bool) {
        return interfaceId == type(IFallbackRegister).interfaceId || super.supportsInterface(interfaceId);
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
