import { gql } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

import { useQuery } from '@apollo/react-hooks';
import {
  ChevronDown,
  CoinEuro,
  CurrencyEthereum,
  Search,
  Tex,
} from 'tabler-icons-react';
import {
  Text,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Menu,
  Title,
  rem,
  TextInput,
  Accordion,
  NumberInput,
} from '@mantine/core';
import NavHeader from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import { CurrentNetworkContext } from '../Context/CurrentNetwork';
import { SWAP_TOKENS } from '../utils/tokens';
import { SUPPORTED_NETWORKS } from '../utils/chains';
import { getEnvironmentWebsiteUrl } from '../utils/helpers';
import { SignerContext } from '../Context/Signer';
import { SearchedPool, TokenBalance } from '../interfaces';
import { client, useGraphQLQuery } from '../lib/graphql/client';
import { searchPool } from '../lib/graphql/queries';
import { ethers, parseEther, parseUnits } from 'ethers';

const SwapPage = () => {
  const { currentNetwork } = useContext(CurrentNetworkContext);
  const { signer } = useContext(SignerContext);
  const [tokensInWallet, setTokensInWallet] = useState<TokenBalance[]>([]);
  const [spendNetwork, setSpendNetwork] = useState<string>('');
  const [buyNetwork, setBuyNetwork] = useState<string>('');
  const [amountToBuy, setAmountToBuy] = useState(0);

  useEffect(() => {
    (async () => {
      if (currentNetwork && signer) {
        // default the spend network to anything other than the current network (randomly select)
        let randomSpendNetwork =
          Object.keys(SUPPORTED_NETWORKS)[Math.floor(Math.random() * 2)];

        while (randomSpendNetwork === currentNetwork) {
          randomSpendNetwork =
            Object.keys(SUPPORTED_NETWORKS)[Math.floor(Math.random() * 2)];
        }

        setSpendNetwork(randomSpendNetwork);
        // default the buying network to the current network
        setBuyNetwork(currentNetwork);
        // TODO: FIX GETTING SHIT FROM MORALIS
        const getMyBalance = await fetch(
          `${getEnvironmentWebsiteUrl()}/api/myTokenBalances`,
          {
            method: 'POST',
            body: JSON.stringify({
              chainId: randomSpendNetwork,
              walletAddress: signer.address,
            }),
          }
        );
        const data = await getMyBalance.json();
        setTokensInWallet(data);
      }
    })();
  }, [currentNetwork]);

  return (
    <Box style={{ maxHeight: '100vh' }}>
      <NavHeader />
      <Flex style={{ height: '90vh' }}>
        <Box style={{ width: '50%', paddingTop: 10 }}>
          <Center px={10} style={{ justifyContent: 'space-between' }}>
            <Box style={{ width: '33%' }} />
            <Box style={{ width: '33%' }}>
              <Title style={{ textAlign: 'center' }}>Spend</Title>
            </Box>
            <Center style={{ width: '33%', justifyContent: 'flex-end' }}>
              <Menu shadow="md" width={200} withArrow>
                <Menu.Target>
                  <Button
                    rightSection={<ChevronDown size={16} />}
                    leftSection={
                      <Image
                        src={SUPPORTED_NETWORKS[spendNetwork]?.logo}
                        style={{ width: 14 }}
                      />
                    }
                    variant="light"
                    color="gray"
                  >
                    {spendNetwork
                      ? SUPPORTED_NETWORKS[spendNetwork].chainName
                      : '???'}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  {Object.entries(SUPPORTED_NETWORKS).map((chainEntry, i) => {
                    const [chainId, configs] = chainEntry;
                    console.log(chainId);
                    return (
                      <Menu.Item
                        onClick={() => {
                          console.log(`new chainId`, chainId);
                          setSpendNetwork(chainId);
                        }}
                        key={i}
                        leftSection={
                          <Image
                            src={configs.logo}
                            style={{ width: rem(14), height: rem(14) }}
                          />
                        }
                      >
                        {configs.chainName}
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
            </Center>
          </Center>
          <Divider mt={10} />
          <Accordion>
            {tokensInWallet?.map((token: TokenBalance) => {
              return (
                <Accordion.Item
                  key={token.token_address}
                  value={token.token_address}
                >
                  <Accordion.Control>
                    <Center style={{ justifyContent: 'flex-start', gap: 10 }}>
                      <Title style={{ fontWeight: 600 }} order={5}>
                        {token.name}
                      </Title>
                    </Center>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {/* @ts-expect-error */}
                    <Text size="sm" c="dimmed">
                      Balance: {token.balance / 10 ** 18} ${token.symbol}
                    </Text>
                    <Box>
                      <Button mt={5} color="cyan" fullWidth>
                        Spend
                      </Button>
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
                // <Center
                // style={{
                //   width: '100%',
                //   background: 'gray',
                //   justifyContent: 'space-between',
                //   }}
                // >
                //   <Text>{token?.name}</Text>

                //   <Text>{(token?.balance / 10 ** 18).toFixed(2)}</Text>
                // </Center>
              );
            })}
          </Accordion>
        </Box>
        <Divider orientation="vertical" />
        <Box style={{ width: '50%', paddingTop: 10 }}>
          <Title style={{ textAlign: 'center' }}>Buy</Title>
          <Divider mt={10} />

          {/* {currentNetwork &&
            Object.entries(SWAP_TOKENS?.[currentNetwork]).map(
              (tokenEntry, i) => {
                const [tokenName, tokenConfigs] = tokenEntry;

                return (
                  <Center key={i} style={{ background: 'red' }}>
                    {tokenName}

                    {tokenConfigs?.lpWithEth}
                  </Center>
                );
              }
            )} */}
          <Box>
            <Accordion>
              {currentNetwork &&
                Object.entries(SWAP_TOKENS[currentNetwork]).map(
                  (tokenEntry) => {
                    const [tokenLp, configs] = tokenEntry;
                    return (
                      <Accordion.Item key={tokenLp} value={tokenLp}>
                        <Accordion.Control>
                          <Center
                            style={{ justifyContent: 'flex-start', gap: 10 }}
                          >
                            {/* @ts-expect-error */}
                            <Image src={configs?.logo} style={{ width: 24 }} />
                            <Title style={{ fontWeight: 600 }} order={5}>
                              {tokenLp}
                            </Title>
                          </Center>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Box>
                            <NumberInput
                              value={amountToBuy}
                              onChange={(e) => {
                                setAmountToBuy(+e);
                              }}
                              style={{ width: '100%' }}
                              // @ts-expect-error
                              label={configs.name}
                              placeholder="Enter amount of tokens to purchase"
                            />
                            <Button mt={5} color="teal" fullWidth>
                              Buy
                            </Button>
                          </Box>
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  }
                )}
            </Accordion>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default SwapPage;

// variables: {
//   //       $orderDirection: OrderDirection
//   // $where: Pool_filter
//   // $orderBy: Pool_orderBy
//   // $first: Int

//   where: {
//     or: [
//       {
//         token0_: {
//           or: [
//             {
//               name_starts_with_nocase: 'hi',
//               symbol_starts_with_nocase: 'hi',
//             },
//           ],
//         },
//       },
//     ],
//   },
//   orderBy: 'liquidity',
//   orderDirection: 'desc',
//   first: 50,
// },
// });
