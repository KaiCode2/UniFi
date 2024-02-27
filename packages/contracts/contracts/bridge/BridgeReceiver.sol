// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/**
 * @title BridgeReceiver
 * @author KDon.eth
 * @notice General abstract contract for bridge receivers to implement to standardize internal hooks
 */
abstract contract BridgeReceiver {

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Bridge Hook
    //  ─────────────────────────────────────────────────────────────────────────────

    /**
     * @dev Internal hook called on implementing contracts to execute logic
     * @param token Address of tokens received
     * @param amount Number of tokens received
     * @param message Unauthenticated calldata to parse, validate then execute
     */
    function _afterTokensBridged(
        address token,
        uint256 amount,
        bytes memory message
    ) internal virtual;
}
