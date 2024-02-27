// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";

abstract contract AccountEntry {
    /**
     * @notice The address of the EntryPoint contract supported by this module.
     */
    address public immutable SUPPORTED_ENTRYPOINT;

    constructor(address entryPoint) {
        if (entryPoint == address(0x0)) revert Errors.InvalidEntryPoint();

        SUPPORTED_ENTRYPOINT = entryPoint;
    }

    /// @notice Checks if a given address is a valid entry point for the abstract account.
    function _isSupportedEntryPoint(address entryPoint) internal virtual view returns (bool) {
        return entryPoint == SUPPORTED_ENTRYPOINT;
    }

    /**
     * @notice Validates the call is initiated by a valid entry point.
     */
    modifier onlySupportedEntryPoint() {
        if (!_isSupportedEntryPoint(_msgSender())) revert Errors.InvalidEntryPoint();

        _;
    }
}
