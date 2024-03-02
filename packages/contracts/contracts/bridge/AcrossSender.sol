// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {V3SpokePoolInterface as SpokePool} from "@across-protocol/contracts-v2/contracts/interfaces/V3SpokePoolInterface.sol";
import {IERC20} from "@openzeppelin/contracts-v5/token/ERC20/IERC20.sol";

/**
 * @title AcrossSender
 * @author KDon.eth
 * @notice Responsible for sending tokens across the bridge
 */
abstract contract AcrossSender {
    
    //  ─────────────────────────────────────────────────────────────────────────────
    //  Fields
    //  ─────────────────────────────────────────────────────────────────────────────

    /// @notice The Across Bridge's SpokePool contract
    SpokePool public spokePool;

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Setup
    //  ─────────────────────────────────────────────────────────────────────────────

    constructor(address _spokePool) {
        spokePool = SpokePool(_spokePool);
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Bridge
    //  ─────────────────────────────────────────────────────────────────────────────

    // TODO: Rename
    function sendAcrossTransaction(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint96 destinationChainId,
        bytes calldata message
    ) external {
        IERC20 tokenContract = IERC20(tokenIn);

        // 1. Check balance and allowance, and validate inputs
        // TODO: Swap for ERC20 standard error
        if (tokenContract.balanceOf(address(this)) < amountIn) revert("AcrossSender: Insufficient balance");
        else if (tokenContract.allowance(address(this), address(spokePool)) < amountIn) tokenContract.approve(address(spokePool), amountIn);
        else if (amountIn == 0 || amountOut == 0) revert("AcrossSender: Invalid swap amount");

        // 2. Send tokens
        spokePool.depositV3(
            address(this),
            address(this),
            tokenIn,
            tokenOut,
            amountIn,
            amountOut,
            uint256(destinationChainId),
            address(0x0),
            uint32(block.timestamp),
            uint32(block.timestamp + 3_600),
            0,
            message
        );
    }
}
