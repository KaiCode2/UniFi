import { EvmChain } from '@moralisweb3/common-evm-utils';

import { NextApiRequest, NextApiResponse } from 'next';
import Moralis from '../../lib/moralis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { chainId, walletAddress } = JSON.parse(req.body);
  console.log(`BASE TEST`, EvmChain.BASE_TESTNET);
  console.log(`BSC TEST`, EvmChain.BSC_TESTNET);
  console.log(`SEPOLIA TEST`, EvmChain.SEPOLIA);
  const balances = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: chainId,
    address: walletAddress,
  });

  console.log(`my tokens`, balances.raw);

  return res.send(balances.raw);
};
export default handler;
