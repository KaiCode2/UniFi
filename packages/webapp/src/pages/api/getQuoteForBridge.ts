import { NextApiRequest, NextApiResponse } from "next";
import { QuoteResponse } from "../../interfaces";

type RequestBody = {
  originChainId: string;
  destinationChainId: string;
  token: string;
  amount: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, destinationChainId, originChainId, token }: RequestBody =
    req.body;

  const getQuoteUrl = new URL("https://across.to/api/suggested-fees");
  getQuoteUrl.searchParams.append("originChainId", originChainId);
  getQuoteUrl.searchParams.append("destinationChainId", destinationChainId);
  getQuoteUrl.searchParams.append("token", token);
  getQuoteUrl.searchParams.append("amount", amount);

  const getQuote = await fetch(getQuoteUrl.href);
  const quoteResponse: QuoteResponse = await getQuote.json();

  return res.send(quoteResponse);
};

export default handler;
