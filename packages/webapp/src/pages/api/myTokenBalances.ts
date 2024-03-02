import { EvmChain } from '@moralisweb3/common-evm-utils';

import { NextApiRequest, NextApiResponse } from 'next';
import Moralis from '../../lib/moralis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { chainId, walletAddress } = JSON.parse(req.body);

  const balances = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: chainId,
    address: walletAddress,
  });

  return res.send(balances.raw);
};
export default handler;
