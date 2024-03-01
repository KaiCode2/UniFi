// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BridgeFallbackHandler} from "./safe/BridgeFallbackHandler.sol";

contract OmnaccountFallback is BridgeFallbackHandler {
    constructor(address _spokePool) BridgeFallbackHandler(_spokePool) {
        // no-op
    }
}
