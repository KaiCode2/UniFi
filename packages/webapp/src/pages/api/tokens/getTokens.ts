import Moralis from 'moralis';
import { EvmChain } from 'moralis/common-evm-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { WETH_ON_ETH_SEPOLIA } from '../../../utils/tokens';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-expect-error
  const { tokenQuery, chainId }: { tokenQuery: string; chainId: string } =
    req.query;

  const tokensMatchedQuery = (
    await Moralis.EvmApi.token.getTokenMetadataBySymbol({
      symbols: [tokenQuery, tokenQuery.toLowerCase(), tokenQuery.toUpperCase()],
      // chain: chainId,
      chain: EvmChain.SEPOLIA,
    })
  ).raw;

  console.log(tokensMatchedQuery[0]);
  const firstTokenLp = await Moralis.EvmApi.defi.getPairAddress({
    exchange: 'uniswapv2',
    chain: EvmChain.SEPOLIA,
    token0Address: tokensMatchedQuery[0].address,
    token1Address: WETH_ON_ETH_SEPOLIA,
  });
  console.log(firstTokenLp.raw);
  // const getLpsInParellel = await Promise.all([
  //   tokensMatchedQuery.map(async (token) => {
  //     const lps = await Moralis.EvmApi.defi.getPairAddress({
  //       exchange: 'uniswapv2',
  //       chain: EvmChain.SEPOLIA,
  //       token0Address: token.address,
  //       token1Address: WETH_ON_ETH_SEPOLIA,
  //     });
  //     return lps.raw;
  //   }),
  // ]);

  // console.log(`the LPS`, await getLpsInParellel);
  return res.send({});
};
export default handler;
