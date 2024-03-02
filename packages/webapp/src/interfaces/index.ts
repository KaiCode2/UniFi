import { ChainIds } from '../utils/chains';

export interface QuoteResponse {
  capitalFeePct: string;
  capitalFeeTotal: string;
  relayGasFeePct: string;
  relayGasFeeTotal: string;
  relayFeePct: string;
  relayFeeTotal: string;
  lpFeePct: string;
  timestamp: string;
  isAmountTooLow: boolean;
  quoteBlock: string;
  spokePoolAddress: string;
  totalRelayFee: {
    pct: string;
    total: string;
  };
  relayerCapitalFee: {
    pct: string;
    total: string;
  };
  relayerGasFee: {
    pct: string;
    total: string;
  };
  lpFee: {
    pct: string;
    total: string;
  };
}

export interface TokenBalance {
  token_address: string;
  symbol: string;
  name: string;
  logo: string | null;
  thumbnail: string | null;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
}

export interface Token {
  name: string;
  decimals: string;
  symbol: string;
  __typename: string;
}

export interface SearchedPool {
  id: string;
  liquidity: string;
  token0: Token;
  token1: Token;
  txCount: string;
  volumeUSD: string;
  __typename: string;
}

export interface DeployedVaults {
  [chain: string]: {
    address: string;
    isModuleEnabled: boolean;
  };
}
