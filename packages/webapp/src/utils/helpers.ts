// import sepoliaFallbackHandler from '../../../contracts/deployments/sepolia/OmnaccountFallback.json';
// import baseSepoliaFallbackHandler from '../../../contracts/deployments/baseSepolia/OmnaccountFallback.json';

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
  '0xaa36a7': "0x1905C2e279dEB69b01B6Bb8caD5Fb32509feBf94", //sepoliaFallbackHandler.address,
  '0x14a33': "0xE5148B253034Ea151c1ba0490Df431ED4c10079D", //baseSepoliaFallbackHandler.address,
};
