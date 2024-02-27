export  interface QuoteResponse {
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
