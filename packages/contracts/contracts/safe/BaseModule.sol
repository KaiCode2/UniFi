// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {BridgeReceiver} from "../bridge/BridgeReceiver.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";
import {AccountEntry} from "./AccountEntry.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import {_packValidationData} from "@account-abstraction/contracts/core/Helpers.sol";


abstract contract BaseModule is IAccount, BridgeReceiver, AccountEntry {

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Structs
    //  ─────────────────────────────────────────────────────────────────────────────

    struct BridgeFallback {
        address target;
        bytes4 selector;
        bytes data;
        uint96 addressIndex;
        uint96 amountIndex;
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Events
    //  ─────────────────────────────────────────────────────────────────────────────

    event TokensBridged(address indexed token, uint256 amount);

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Maps token address to default fallback behavior
    mapping(address token => BridgeFallback fallbackData) public bridgeFallbacks;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(address entryPoint) AccountEntry(entryPoint) {
        // no-op
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Bridge Receiver Implementation
    //  ─────────────────────────────────────────────────────────────────────────────

    function _afterTokensBridged(
        address token,
        uint256 amount,
        bytes memory message
    ) internal override virtual {
        // 1. Validate the message

        // 2. Execute the message's calldata

        emit TokensBridged(token, amount);
    }
}
