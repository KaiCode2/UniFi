import ethLogo from '../../public/ethLogo.png';
import baseLogo from '../../public/baseLogo.png';
import { ETH_SEPOLIA_CHAIN_ID, BASE_SEPOLIA_CHAIN_ID } from './helpers';

export const CHAIN_ID = [
  ETH_SEPOLIA_CHAIN_ID, // ETH Sepolia
  BASE_SEPOLIA_CHAIN_ID, // Base Sepolia
];

export type ChainIds = '0xaa36a7' | '0x14a34';

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
  [ETH_SEPOLIA_CHAIN_ID]: {
    chainName: 'ETH Sepolia',
    logo: ethLogo.src,
    token: {
      name: 'ETH',
      decimals: 18,
      symbol: 'ETH',
      rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    },
  },
  [BASE_SEPOLIA_CHAIN_ID]: {
    chainName: 'Base Sepolia',
    logo: baseLogo.src,
    token: {
      name: 'Base ETH',
      decimals: 18,
      symbol: 'ETH',
      rpcUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL,
    },
  },
};

export const selectableChains = [
  { value: ETH_SEPOLIA_CHAIN_ID, label: 'ETH Sepolia' },
  { value: BASE_SEPOLIA_CHAIN_ID, label: 'Base Sepolia' },
];

export interface RpcUrls {
  [chainId: string]: string;
}

export const RPC_URLS: RpcUrls = {
  [ETH_SEPOLIA_CHAIN_ID]:
    process.env.SEPOLIA_RPC_URL ??
    'https://ethereum-sepolia-rpc.publicnode.com',
  [BASE_SEPOLIA_CHAIN_ID]:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL ??
    'https://rpc.notadegen.com/base/sepolia',
};
