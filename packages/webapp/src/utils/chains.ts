import ethLogo from '../../public/ethLogo.png';
import baseLogo from '../../public/baseLogo.png';

export const CHAIN_ID = [
  '0xaa36a7', // ETH Sepolia
  '0x14a33', // Base Sepolia
];

export type ChainIds="0xaa36a7"|'0x14a33'

export interface Network {
  chainName: string;
  logo: string;
  token: {
    name: string;
    decimals: number;
    symbol: string;
    rpcUrl: string;
  };
}

export interface SupportedNetworks {
  [chainId: string]: Network;
}

export const SUPPORTED_NETWORKS: SupportedNetworks = {
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

export interface RpcUrls {
  [chainId: string]: string;
}

export const RPC_URLS: RpcUrls = {
  '0xaa36a7': process.env.SEPOLIA_RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com',
  '0x14a33': process.env.BASE_SEPOLIA_RPC_URL ?? 'https://base-goerli.public.blastapi.io',
};
