import { gql } from '@apollo/client';
import { client } from './client';

export const TOKEN_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`;

export const searchPool = async ({ searchQuery }: { searchQuery: string }) => {
  const query = await client.query({
    query: gql`
      {
        pools(
          where: {
            or: [
              {
                token0_: {
                  or: [
                    {
                      name_starts_with_nocase: "${searchQuery}"
                      symbol_starts_with_nocase: "${searchQuery}"
                    }
                  ]
                }
              }
            ]
          }
          orderBy: liquidity
          orderDirection: desc
          first: 50
        ) {
          liquidity
          id
          volumeUSD
          txCount
          token0 {
            name
            decimals
            symbol
          }
          token1 {
            name
            decimals
            symbol
          }
        }
      }
    `,
  });
  return query.data;
};
