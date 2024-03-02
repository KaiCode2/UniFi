// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {OmnaccountModule} from "../../contracts/OmnaccountModule.sol";

contract AcrossBridgeTest is Test {
    address public bridge;
    address public entryPoint;
    OmnaccountModule public omnaccountModule;

    function setUp() public {
        bridge = makeAddr("BRIDGE");
        entryPoint = makeAddr("ENTRYPOINT");

        omnaccountModule = new OmnaccountModule(entryPoint, bridge);
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
