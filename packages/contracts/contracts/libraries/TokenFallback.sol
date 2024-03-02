// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

library TokenFallback {
    //  ─────────────────────────────────────────────────────────────────────────────
    //  Structs
    //  ─────────────────────────────────────────────────────────────────────────────

    // TODO: Rename and add docs
    struct FallbackData {
        address target;
        bytes4 selector;
        bytes data;
        uint96 addressIndex;
        uint96 amountIndex;
    }

    //  ─────────────────────────────────────────────────────────────────────────────
    //  Struct Encoding and Decoding
    //  ─────────────────────────────────────────────────────────────────────────────

    /**
     * @dev Encode executable call for a TokenFallback object
     * @param self TokenFallback object to encode
     * @param token Token address to insert at addressIndex
     * @param amount Token amount to insert at amountIndex
     */
    function encode(
        FallbackData memory self,
        address token,
        uint256 amount
    ) internal pure returns (bytes memory) {
        // self.data[self.addressIndex] = bytes32(uint256(uint160(target)));
        // TODO: Implement address and amo insertion

        if (self.addressIndex != 0) {
            bytes32 addressBytes = bytes32(uint256(uint160(token)));
            for (uint256 i = 0; i < 20; i++) {
                self.data[self.addressIndex + i] = addressBytes[i];
            }
        }
        if (self.amountIndex != 0) {
            bytes32 amountBytes = bytes32(amount);
            for (uint256 i = 0; i < 32; i++) {
                self.data[self.amountIndex + i] = amountBytes[i];
            }
        }

        return abi.encodeWithSelector(self.selector, self.data);
    }
}
