import Moralis from 'moralis';

Moralis.start({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
});

export default Moralis;
