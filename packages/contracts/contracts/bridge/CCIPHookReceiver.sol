// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {BridgeReceiver} from "./BridgeReceiver.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

/**
 * @title CCIPHookReceiver
 * @notice Standardized internal hooks for CCIP messages
 * @dev This is demo of how CCIP could be handled and is not yet implemented
 */
abstract contract CCIPHookReceiver is BridgeReceiver, CCIPReceiver {

    constructor(address ccipRouter) CCIPReceiver(ccipRouter) {
    }

    /*
    Client.Any2EVMMessage = {
        bytes32 messageId; // MessageId corresponding to ccipSend on source.
        uint64 sourceChainSelector; // Source chain selector.
        bytes sender; // abi.decode(sender) if coming from an EVM chain.
        bytes data; // payload sent in original message.
        EVMTokenAmount[] destTokenAmounts; // Tokens and their amounts in their destination chain representation.
    }
    */
    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        address sender = abi.decode(message.sender, (address));

        // QUESTION: How would we standardize bridge hooks when across sends one but CCIP send many tokens?...
        for (uint256 i = 0; i < message.destTokenAmounts.length; i++) {
            Client.EVMTokenAmount memory tokenAmount = message.destTokenAmounts[i];
            _afterTokensBridged(
                tokenAmount.token,
                tokenAmount.amount,
                message.data
            );
        }
    }
}
