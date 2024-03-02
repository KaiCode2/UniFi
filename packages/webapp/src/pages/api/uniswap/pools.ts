import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const gqlQuery = `{
        pools(first: 1000, orderBy: liquidity, orderDirection: desc) {
          id
        }
       }`;
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};
export default handler;
