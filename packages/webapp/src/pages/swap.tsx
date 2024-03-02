import { ChevronDown } from 'tabler-icons-react';
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
import { ethers } from 'ethers';

const SwapPage = () => {
  const { currentNetwork, setCurrentNetwork } = useContext(
    CurrentNetworkContext
  );
  const { signer, setSigner } = useContext(SignerContext);
  const [tokensInWallet, setTokensInWallet] = useState<TokenBalance[]>([]);
  const [spendNetwork, setSpendNetwork] = useState<string>('');

  const [amountToBuy, setAmountToBuy] = useState(0);

  const [vaults, setVaults] = useState();

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
  }, [currentNetwork, spendNetwork]);

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
                        style={{ width: 18 }}
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
                    <Text size="sm" c="dimmed">
                      {/* @ts-expect-error */}
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
          <Center px={10} style={{ justifyContent: 'space-between' }}>
            <Box style={{ width: '33%' }} />
            <Box style={{ width: '33%' }}>
              <Title style={{ textAlign: 'center' }}>Buy</Title>
            </Box>
            <Center style={{ width: '33%', justifyContent: 'flex-end' }}>
              <Menu shadow="md" width={200} withArrow>
                <Menu.Target>
                  <Button
                    rightSection={<ChevronDown size={16} />}
                    leftSection={
                      <Image
                        src={SUPPORTED_NETWORKS[currentNetwork]?.logo}
                        style={{ width: 18 }}
                      />
                    }
                    variant="light"
                    color="gray"
                  >
                    {currentNetwork
                      ? SUPPORTED_NETWORKS[currentNetwork].chainName
                      : '???'}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  {Object.entries(SUPPORTED_NETWORKS).map((chainEntry, i) => {
                    const [chainId, configs] = chainEntry;
                    console.log(`new chainId`, chainId);
                    return (
                      <Menu.Item
                        onClick={async () => {
                          console.log();
                          try {
                            // switch to chain they want to deploy vault on
                            // @ts-expect-error
                            await window?.ethereum.request({
                              method: 'wallet_switchEthereumChain',
                              params: [
                                {
                                  // this is ETH sepolia tesnet
                                  chainId,
                                },
                              ],
                            });
                            // NOTE: refresh the signer with new network connection
                            const provider = new ethers.BrowserProvider(
                              // @ts-expect-error
                              window?.ethereum
                            );
                            const signerWithNewNetwork =
                              await provider.getSigner();
                            setSigner(signerWithNewNetwork);
                            setCurrentNetwork(chainId);
                          } catch (err) {
                            // add network if they don't have it added to metamask
                            if (err.code == 4902) {
                              const { name, decimals, symbol, rpcUrl } =
                                SUPPORTED_NETWORKS[chainId].token;
                              console.log(SUPPORTED_NETWORKS[chainId]);
                              // @ts-expect-error
                              await window?.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                  {
                                    chainName:
                                      SUPPORTED_NETWORKS[chainId].chainName,
                                    chainId,
                                    nativeCurrency: {
                                      name,
                                      decimals,
                                      symbol,
                                    },
                                    rpcUrls: [rpcUrl],
                                  },
                                ],
                              });
                              const provider = new ethers.BrowserProvider(
                                // @ts-expect-error
                                window?.ethereum
                              );
                              const signerWithNewNetwork =
                                await provider.getSigner();
                              setSigner(signerWithNewNetwork);
                            }
                          }
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

// let transactions = [];
//       if (await IERC20__factory.connect(inputTokenAddress, ownerSigner).allowance(vaultDeployment.address, spokePool) < ethers.parseUnits(amountIn, 18)) {
//         const approveTx = await IERC20__factory.connect(inputTokenAddress, ownerSigner).approve.populateTransaction(spokePool, ethers.MaxUint256);
//         transactions.push({
//           to: approveTx.to,
//           value: "0",
//           data: approveTx.data
//         })
//         console.log("Approving token...")
//       } else {
//         transactions.push({
//           to: moduleDeployment.address,
//           value: "0",
//           data: calldata.data,
//         });
//         console.log("Sending bridge transaction...")
//       }
//       let safeTx = await connection.createTransaction({transactions});
//       safeTx = await connection.signTransaction(safeTx);
