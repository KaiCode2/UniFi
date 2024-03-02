// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

library TokenFallback {
    //  ─────────────────────────────────────────────────────────────────────────────
    //  Structs
    //  ─────────────────────────────────────────────────────────────────────────────

    struct FallbackData {
        address target;
        bytes4 selector;
        uint96 tokenAddressIndex;
        uint96 amountIndex;
        uint96 vaultAddressIndex;
        bytes data;
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
        uint256 amount,
        address vault
    ) internal pure returns (bytes memory encodedCall) {
        encodedCall = abi.encodeWithSelector(self.selector, self.data);

        if (self.tokenAddressIndex != 0) {
            bytes32 addressBytes = bytes32(uint256(uint160(token)));
            for (uint256 i = 0; i < 20; i++) {
                self.data[self.tokenAddressIndex + i] = addressBytes[i];
            }
        }
        if (self.amountIndex != 0) {
            bytes32 amountBytes = bytes32(amount);
            for (uint256 i = 0; i < 32; i++) {
                self.data[self.amountIndex + i] = amountBytes[i];
            }
        }
        if (self.vaultAddressIndex != 0) {
            bytes32 vaultAddressBytes = bytes32(uint256(uint160(vault)));
            for (uint256 i = 0; i < 20; i++) {
                self.data[self.vaultAddressIndex + i] = vaultAddressBytes[i];
            }
        }
    }
}
