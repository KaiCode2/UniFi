// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BridgeFallbackHandler} from "./safe/BridgeFallbackHandler.sol";

/*


██╗   ██╗███╗   ██╗██╗███████╗██╗
██║   ██║████╗  ██║██║██╔════╝██║
██║   ██║██╔██╗ ██║██║█████╗  ██║
██║   ██║██║╚██╗██║██║██╔══╝  ██║
╚██████╔╝██║ ╚████║██║██║     ██║
 ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝
                                 

*/


/**
 * @title UniFiPlugin
 * @notice Abstract account (ERC-4337) plugin allowing cross-chain token transfers with destination chain execution and default token behavior.
 * @author KDon.eth
 */
contract UniFiPlugin is BridgeFallbackHandler {
    constructor(address _spokePool) BridgeFallbackHandler(_spokePool) {
        // no-op
    }
}
