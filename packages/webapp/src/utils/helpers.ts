import sepoliaFallbackHandler from '../../../contracts/deployments/sepolia/OmnaccountFallback.json';
import baseSepoliaFallbackHandler from '../../../contracts/deployments/baseSepolia/OmnaccountFallback.json';
import { SUPPORTED_NETWORKS } from './chains';

export const ETH_SEPOLIA_CHAIN_ID = '0xaa36a7';
export const BASE_SEPOLIA_CHAIN_ID = '0x14a34';

// this is ETH sepolia
export const DEFAULT_TESTNET_TO_ADD = ETH_SEPOLIA_CHAIN_ID;

export const decimalToHexChainId = (decimalChainId: number): string => {
  return '0x' + decimalChainId.toString(16);
};

export const DEVELOPMENT_WEBSITE_URL = 'http://localhost:3000';
// TODO: change in prod to deployed URL
export const PRODUCTION_WEBSITE_URL = 'http://localhost:3000';

export const getEnvironmentWebsiteUrl = () =>
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_WEBSITE_URL
    : DEVELOPMENT_WEBSITE_URL;

interface FallbackHandlerAddresses {
  [chainId: string]: string;
}

export const NETWORK_FALLBACK_HANDLERS: FallbackHandlerAddresses = {
  // ETH Sepolia
  [ETH_SEPOLIA_CHAIN_ID]: sepoliaFallbackHandler.address,
  [BASE_SEPOLIA_CHAIN_ID]: baseSepoliaFallbackHandler.address,
};

export const addNetwork = async (chainId) => {
  const { name, decimals, symbol, rpcUrl } = SUPPORTED_NETWORKS[chainId].token;

  // @ts-expect-error
  await window?.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainName: SUPPORTED_NETWORKS[chainId].chainName,
        chainId,
        nativeCurrency: {
          name,
          decimals,
          symbol,
        },
        rpcUrls: [rpcUrl],
      },
    ],
  });
};

export const BASE_SEPOLIA_SPOKE_POOL =
  '0x82B564983aE7274c86695917BBf8C99ECb6F0F8F';
