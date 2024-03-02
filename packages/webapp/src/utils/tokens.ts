import shibaLogo from '../../public/shiba.png';

export const SWAP_TOKENS = {
  // Eth sepolia
  '0xaa36a7': {
    'SHIB-WETH': {
      tokenAddress: '0x62A3F555d3EF10F395Dec69B9f8026B5aD01019C',
      lpWithEth: '0x0465CdCF79dB9a416F3e94923607a98d44a5dA68',
      name: 'Shib on ETH Sepolia',
      logo: shibaLogo.src,
    },
  },
  // Base Sepolia
  '0x14a33': {
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
