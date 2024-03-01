// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {IAccount} from "@account-abstraction/contracts/interfaces/IAccount.sol";
import {AcrossHookReceiver} from "../bridge/AcrossHookReceiver.sol";
import {CCIPHookReceiver} from "../bridge/CCIPHookReceiver.sol";
import {AcrossSender} from "../bridge/AcrossSender.sol";
import {OmnaccountErrors as Errors} from "../interfaces/Errors.sol";
// import {AccountEntry} from "./AccountEntry.sol";
import {ISafe} from "../interfaces/ISafe.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import {_packValidationData} from "@account-abstraction/contracts/core/Helpers.sol";


abstract contract BaseModule is AcrossSender { //, IAccount, AccountEntry {

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Constructor
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(address spokePool) AcrossSender(spokePool) {
        // no-op
    }
}
