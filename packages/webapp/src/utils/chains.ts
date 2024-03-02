import ethLogo from '../../public/ethLogo.png';
import baseLogo from '../../public/baseLogo.png';

export const SUPPORTED_NETWORKS = {
  '0xaa36a7': {
    chainName: 'ETH Sepolia',
    logo: ethLogo.src,
    token: {
      name: 'ETH',
      decimals: 18,
      symbol: 'ETH',
      rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    },
  },
  '0x14a33': {
    chainName: 'Base Sepolia',
    logo: baseLogo.src,
    token: {
      name: 'Base ETH',
      decimals: 18,
      symbol: 'BETH',
      rpcUrl: 'https://base-goerli.public.blastapi.io',
    },
  },
};

export const selectableChains = [
  { value: '0xaa36a7', label: 'ETH Sepolia' },
  { value: '0x14a33', label: 'Base Sepolia' },
];
