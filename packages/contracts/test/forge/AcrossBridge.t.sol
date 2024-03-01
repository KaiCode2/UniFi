// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {OmnaccountModule} from "../../contracts/OmnaccountModule.sol";

contract AcrossBridgeTest is Test {
    address public bridge;
    OmnaccountModule public omnaccountModule;

    function setUp() public {
        bridge = makeAddr("BRIDGE");

        omnaccountModule = new OmnaccountModule(bridge);
        // counter = new Counter();
        // counter.setNumber(0);
    }

    // function test_Increment() public {
    //     counter.increment();
    //     assertEq(counter.number(), 1);
    // }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
