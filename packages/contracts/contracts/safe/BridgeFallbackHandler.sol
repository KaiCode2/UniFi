// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {HandlerContext} from "@safe-global/safe-contracts/contracts/handler/HandlerContext.sol";
import {CompatibilityFallbackHandler} from "@safe-global/safe-contracts/contracts/handler/CompatibilityFallbackHandler.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";

import "hardhat/console.sol";

abstract contract BridgeFallbackHandler is CompatibilityFallbackHandler, HandlerContext, AcrossHookReceiver {
    
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

    constructor(address _spokePool) AcrossHookReceiver(_spokePool) {
        // no-op
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Bridge Receiver Implementation
    //  ─────────────────────────────────────────────────────────────────────────────

    function _afterTokensBridged(
        address token,
        uint256 amount,
        bytes memory message
    ) internal virtual override {
        // 1. Validate the message

        console.log("Bridge fallback handler received tokens: ", token, amount);

        // 2. Execute the message's calldata

        emit TokensBridged(token, amount);
    }
}
