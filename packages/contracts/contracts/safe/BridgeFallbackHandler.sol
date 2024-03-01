// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {HandlerContext} from "@safe-global/safe-contracts/contracts/handler/HandlerContext.sol";
import {CompatibilityFallbackHandler} from "@safe-global/safe-contracts/contracts/handler/CompatibilityFallbackHandler.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";
import {TokenFallback} from "../libraries/TokenFallback.sol";
import {IFallbackRegister} from "../interfaces/IFallbackRegister.sol";

abstract contract BridgeFallbackHandler is CompatibilityFallbackHandler, HandlerContext, AcrossHookReceiver {
    using TokenFallback for TokenFallback.FallbackData;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Events
    //  ─────────────────────────────────────────────────────────────────────────────

    event TokensBridged(address indexed token, uint256 amount, bytes output);

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice Omnaccount token bridge fallback register
    IFallbackRegister public fallbackRegister;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(address _spokePool, address _fallbackRegister) AcrossHookReceiver(_spokePool) {
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
        // 1. Validate the message
        if (message.length == 0) {
            // If length is 0, check for a fallback handler
            (bool exists, TokenFallback.FallbackData memory fallbackData) = fallbackRegister.getFallback(address(this), token);
            if (exists) {
                (bool success, bytes memory output) = fallbackData.target.call(fallbackData.encode(token, amount));
                require(success);
                message = output;
            }
        } else {
            // If length is not 0, validate message is authorized then execute the message's calldata
        }

        // 2. Execute the message's calldata

        emit TokensBridged(token, amount, message);
    }
}
