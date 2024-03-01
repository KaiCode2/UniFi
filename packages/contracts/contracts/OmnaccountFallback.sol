// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BridgeFallbackHandler} from "./safe/BridgeFallbackHandler.sol";

contract OmnaccountFallback is BridgeFallbackHandler {
    // TODO: spokepool can be extracted from fallback register
    constructor(address _spokePool, address _fallbackRegister) BridgeFallbackHandler(_spokePool, _fallbackRegister) {
        // no-op
    }
}
