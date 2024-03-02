import shibaLogo from '../../public/shiba.png';
import { BASE_SEPOLIA_CHAIN_ID, ETH_SEPOLIA_CHAIN_ID } from './helpers';

export const SWAP_TOKENS = {
  // Eth sepolia
  [ETH_SEPOLIA_CHAIN_ID]: {
    'SHIB-WETH': {
      tokenAddress: '0x62A3F555d3EF10F395Dec69B9f8026B5aD01019C',
      lpWithEth: '0x0465CdCF79dB9a416F3e94923607a98d44a5dA68',
      name: 'Shib on ETH Sepolia',
      logo: shibaLogo.src,
    },
  },
  // Base Sepolia
  [BASE_SEPOLIA_CHAIN_ID]: {
    // TODO: add token and LP to base sepolia
    'Base SHIB-WETH': {
      tokenAddress: '0x62A3F555d3EF10F395Dec69B9f8026B5aD01019C',
      lpWithEth: '0x0465CdCF79dB9a416F3e94923607a98d44a5dA68',
      name: 'Shib on Base Sepolia',
      logo: shibaLogo.src,
    },
  },
};

// ETH MAINNET ENS: 0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72
// ETH MAINNET SHIBA: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',

export const WETH_ON_ETH_SEPOLIA = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';
export const WETH_ON_BASE_SEPOLIA =
  '0x4200000000000000000000000000000000000006';

export const WETH_ON_NETWORK = {
  [ETH_SEPOLIA_CHAIN_ID]: WETH_ON_ETH_SEPOLIA,
  [BASE_SEPOLIA_CHAIN_ID]: WETH_ON_BASE_SEPOLIA,
};
