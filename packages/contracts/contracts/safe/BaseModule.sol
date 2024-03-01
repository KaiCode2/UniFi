// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";
import {CCIPHookReceiver} from "../bridge/CCIPHookReceiver.sol";
import {AcrossSender} from "../bridge/AcrossSender.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import {_packValidationData} from "@account-abstraction/contracts/core/Helpers.sol";
import {TokenFallback} from "../libraries/TokenFallback.sol";
import {BasePluginWithEventMetadata, PluginMetadata} from "./Base.sol";
import {IFallbackRegister} from "../interfaces/IFallbackRegister.sol";
import {ISafeProtocolPlugin} from "@safe-global/safe-core-protocol/contracts/interfaces/Modules.sol";
import {IERC165} from "@openzeppelin/contracts-v5/utils/introspection/IERC165.sol";

abstract contract BaseModule is AcrossSender, BasePluginWithEventMetadata, IFallbackRegister { //, IAccount {
    using TokenFallback for TokenFallback.FallbackData;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Events
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Emitted when a token fallback is set
    event TokenFallbackAdded(address indexed safe, address indexed token, TokenFallback.FallbackData fallbackData);

    /// @notice Emitted when a token fallback is removed
    event TokenFallbackRemoved(address indexed safe, address indexed token);

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Maps Safe wallet to token address to default fallback behavior
    mapping (address safe => mapping(address token => TokenFallback.FallbackData)) public bridgeFallbacks;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(address spokePool)
        AcrossSender(spokePool)
        BasePluginWithEventMetadata(
            PluginMetadata({name: "Across Bridge", version: "1.0.0", requiresRootAccess: false, iconUrl: "", appUrl: ""})
        )
    {
        // no-op
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
    function requiresPermissions() external view returns (uint8 permissions) {
        return 4; // Requires DELEGATE_CALL permission
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IFallbackRegister).interfaceId || super.supportsInterface(interfaceId);
    }
}
