// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {SpokePoolInterface} from "@across-protocol/contracts-v2/contracts/interfaces/SpokePoolInterface.sol";

interface V3SpokePoolInterface {
    function depositV3(
        address depositor,
        address recipient,
        address inputToken,
        address outputToken,
        uint256 inputAmount,
        uint256 outputAmount,
        uint256 destinationChainId,
        address exclusiveRelayer,
        uint32 quoteTimestamp,
        uint32 fillDeadline,
        uint32 exclusivityDeadline,
        bytes calldata message
    ) external payable;
}


abstract contract Relayer {
    SpokePoolInterface public spokePool;

    constructor(address _spokePool) {
        // instantiate spokePool (this will handle bridging across w/ "Across Bridge")
        spokePool = SpokePoolInterface(_spokePool);
    }




    function testBridge() public {

        // spokePool.depositV3(
        //     userAddress, // User's address on the origin chain.
        //     userAddress, // recipient. Whatever address the user wants to recieve the funds on the destination.
        //     usdcAddress, // inputToken. This is the usdc address on the originChain
        //     address(0), // outputToken: 0 address means the output token and input token are the same. Today, no relayers support swapping so the relay will not be filled if this is set to anything other than 0x0.
        //     amount, // inputAmount
        //     amount - totalRelayFee, // outputAmount: this is the amount - relay fees. totalRelayFee is the value returned by the suggested-fees API.
        //     destinationChainId, // destinationChainId
        //     address(0), // exclusiveRelayer: set to 0x0 for typical integrations.
        //     timestamp, // timestamp: this should be the timestamp returned by the API. Otherwise, set to block.timestamp.
        //     block.timestamp + 21600, // fillDeadline: We reccomend a fill deadline of 6 hours out. The contract will reject this if it is beyond 8 hours from now.
        //     0, // exclusivityDeadline: since there's no exclusive relayer, set this to 0.
        //     "", // message: empty message since this is just a simple transfer.
        // );

    }

}