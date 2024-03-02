// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;


// This interface is expected to be implemented by any contract that expects to receive messages from the SpokePool.
interface IAcrossMessageHandler {
    /// @custom:audit FOLLOWING FUNCTION TO BE DEPRECATED
    function handleAcrossMessage(
        address tokenSent,
        uint256 amount,
        bool fillCompleted,
        address relayer,
        bytes memory message
    ) external;

    // New function interface to be used with V3 functions since fillCompleted no longer has any
    // meaning now that partial fills are impossible.
    function handleV3AcrossMessage(
        address tokenSent,
        uint256 amount,
        address relayer,
        bytes memory message
    ) external;
}
