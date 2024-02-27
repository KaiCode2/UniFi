// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {V3SpokePoolInterface} from "@across-protocol/contracts-v2/contracts/interfaces/V3SpokePoolInterface.sol";
// import {Polygon_SpokePool} from "@across-protocol/contracts-v2/contracts/Polygon_SpokePool.sol";
// import {Ethereum_SpokePool} from "@across-protocol/contracts-v2/contracts/Ethereum_SpokePool.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// contract Spoke {
//     function depositV3(
//         address depositor,
//         address recipient,
//         address inputToken,
//         address outputToken,
//         uint256 inputAmount,
//         uint256 outputAmount,
//         uint256 destinationChainId,
//         address exclusiveRelayer,
//         uint32 quoteTimestamp,
//         uint32 fillDeadline,
//         uint32 exclusivityDeadline,
//         bytes calldata message
//     ) external payable {

//     }

//     function speedUpV3Deposit(
//         address depositor,
//         uint32 depositId,
//         uint256 updatedOutputAmount,
//         address updatedRecipient,
//         bytes calldata updatedMessage,
//         bytes calldata depositorSignature
//     ) external {

//     }
// }

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
