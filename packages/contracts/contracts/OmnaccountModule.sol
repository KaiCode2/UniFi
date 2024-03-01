// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseModule} from "./safe/BaseModule.sol";
import {OmnaccountErrors as Errors} from "./interfaces/Errors.sol";
import {BasePlugin} from "./safe/Base.sol";

/**
 * @title OmnaccountModule
 * @author KDon.eth
 * @notice ERC-4337 abstract account module enabling cross-chain userOp execution powered by Across V3 Bridge and Safe
 */
contract OmnaccountModule is BaseModule, Errors {
    constructor(address _spokePool) BaseModule(_spokePool) {
        // no-op
    }
}
