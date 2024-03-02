// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {TokenFallback} from "../libraries/TokenFallback.sol";

interface IFallbackRegister {
    // TODO: Docs
    function getFallback(address safe, address token) external view returns (bool exists, TokenFallback.FallbackData memory fallbackData);
    function setTokenFallback(address token, TokenFallback.FallbackData memory fallbackData) external;
    function removeTokenFallback(address token) external;
}
