// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {BridgeReceiver} from "./BridgeReceiver.sol";
import {IAcrossMessageHandler} from "../interfaces/IAcrossMessageHandler.sol";
import {HandlerContext} from "@safe-global/safe-contracts/contracts/handler/HandlerContext.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";

/**
 * @title AcrossHookReceiver
 * @author KDon.eth
 * @notice Parses inbound Across (bridge) transfers and authenticates messages.
 * @dev This contract is expected to be inherited by any contract that handle executing arbitrary message logic
 */
abstract contract AcrossHookReceiver is BridgeReceiver, IAcrossMessageHandler, HandlerContext {

    /// @notice The address of the Across Bridge contract
    address public immutable ACROSS_BRIDGE;

    constructor(address bridge) {
        if (bridge == address(0x0)) revert Errors.InvalidBridge();

        ACROSS_BRIDGE = bridge;
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Across Message Handling
    //  ─────────────────────────────────────────────────────────────────────────────

    function handleAcrossMessage(
        address tokenSent,
        uint256 amount,
        bool,
        address,
        bytes memory message
    ) external onlyBridge {
        _afterTokensBridged(tokenSent, amount, message);
    }

    function handleV3AcrossMessage(
        address tokenSent,
        uint256 amount,
        address,
        bytes memory message
    ) external onlyBridge {
        _afterTokensBridged(tokenSent, amount, message);
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Internal Utilities
    //  ─────────────────────────────────────────────────────────────────────────────

    function _isBridge(address bridge) internal view returns (bool) {
        return bridge == ACROSS_BRIDGE;
    }

    modifier onlyBridge() {
        if (!_isBridge(_msgSender())) revert Errors.InvalidBridge();

        _;
    }
}
