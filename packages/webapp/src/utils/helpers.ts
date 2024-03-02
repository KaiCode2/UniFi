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
