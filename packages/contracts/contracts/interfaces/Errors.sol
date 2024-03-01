// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/**
 * @title OmnaccountErrors
 * @author KDon.eth
 * @notice Standard interface for Omnaccount error codes
 */
interface OmnaccountErrors {

    /// @notice Reverted if attempting to execute userOp from invalid sender
    error InvalidEntryPoint();

    /// @notice Reverted if address is not bridge
    error InvalidBridge();

    /// @notice Reverted if module is not enabled
    error ModuleNotEnabled(address safe);
}
