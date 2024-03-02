import protocolKit from '@safe-global/protocol-kit';

import spokePoolAbi from '../../../contracts/artifacts/@across-protocol/contracts-v2/contracts/interfaces/V3SpokePoolInterface.sol/V3SpokePoolInterface.json';

import erc20Abi from '../utils/abis/erc20.json';
import safeVaultAbi from '../../../contracts/artifacts/contracts/interfaces/ISafe.sol/ISafe.json';
import Safe, { SafeFactory, EthersAdapter } from '@safe-global/protocol-kit';
import { notifications } from '@mantine/notifications';
import { ChevronDown, ShieldLock } from 'tabler-icons-react';
import {
  Checkbox,
  Text,
  Avatar,
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
import { useDisclosure } from '@mantine/hooks';
import NavHeader from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import { CurrentNetworkContext } from '../Context/CurrentNetwork';
import { SWAP_TOKENS, WETH_ON_NETWORK } from '../utils/tokens';
import { RPC_URLS, SUPPORTED_NETWORKS } from '../utils/chains';
import {
  SPOKE_POOLS,
  addNetwork,
  getEnvironmentWebsiteUrl,
} from '../utils/helpers';
import { SignerContext } from '../Context/Signer';
import { DeployedVaults, SearchedPool, TokenBalance } from '../interfaces';
import { ethers } from 'ethers';
import BridgeExecuteModal from '@/components/modals/bridgeExecute';
import { makeBridgeTypedMessage } from '@/utils/signatures';

export type TokenToBuy = {
  tokenAddress: string;
  lpWithEth: string;
  name: string;
  logo: string;
};

const SwapPage = () => {
  const [amountOfTokenToSwap, setAmountOfTokenToSwap] = useState(0);
  const { currentNetwork, setCurrentNetwork } = useContext(
    CurrentNetworkContext
  );
  const { signer, setSigner } = useContext(SignerContext);
  const [tokensInWallet, setTokensInWallet] = useState<TokenBalance[]>([]);
  const [spendNetwork, setSpendNetwork] = useState<string>('');
  const [amountToBuy, setAmountToBuy] = useState(0);
  const [spendToken, setSpendToken] = useState<TokenBalance | null>(null);
  const [vaults, setVaults] = useState<DeployedVaults | null>(null);
  const [
    currentUserToCheckBalanceAddress,
    setCurrentUserToCheckBalanceAddress,
  ] = useState<string>(signer?.address || '');
  const [opened, { open, close }] = useDisclosure(false);
  const [currentTokenToSwapTo, setCurrentTokenToSwapTo] =
    useState<TokenToBuy | null>(null);

  // const [wethContractNetworkBalance, setWethContractNetworkBalance] =
  //   useState<ethers.Contract | null>(null);

  // useEffect(() => {
  //   if (signer && spendNetwork && currentUserToCheckBalanceAddress) {
  //     (async () => {
  //       const wethContract = new ethers.Contract(
  //         WETH_ON_NETWORK[spendNetwork],
  //         erc20Abi,
  //         new ethers.BrowserProvider(window?.ethereum)
  //       );
  //       console.log('CURNET USAER', currentUserToCheckBalanceAddress);
  //       // console.log(`signer address`, signer?.address);
  //       // console.log(wethContract.balanceOf(currentUserToCheckBalanceAddress));
  //       const balance = await wethContract.balanceOf(
  //         currentUserToCheckBalanceAddress
  //       );
  //       console.log(`weth baalcne`, balance);
  //       // setWethContractNetworkBalance(balance);
  //     })();
  //   }
  // }, [spendNetwork, currentUserToCheckBalanceAddress]);

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
              walletAddress:
                currentUserToCheckBalanceAddress || signer?.address,
            }),
          }
        );
        const data = await getMyBalance.json();
        setTokensInWallet(data);
        setCurrentUserToCheckBalanceAddress(signer.address);
      }
    })();
  }, [currentNetwork, spendNetwork]);

  useEffect(() => {
    (async () => {
      if (currentUserToCheckBalanceAddress) {
        const getMyBalance = await fetch(
          `${getEnvironmentWebsiteUrl()}/api/myTokenBalances`,
          {
            method: 'POST',
            body: JSON.stringify({
              chainId: spendNetwork,
              walletAddress:
                currentUserToCheckBalanceAddress || signer?.address,
            }),
          }
        );
        const data = await getMyBalance.json();
        setTokensInWallet(data);
      }
    })();
  }, [currentUserToCheckBalanceAddress]);

  // for getting vaults for user
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localVaults: DeployedVaults = JSON.parse(
        localStorage.getItem('vaults')
      );
      setVaults(localVaults);
    }
  }, []);

  // useEffect(() => {
  //   if (signer) {
  //     (async () => {
  //       const getVaults = await fetch(`/api/safe`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           chainIds: Object.keys(SUPPORTED_NETWORKS),
  //           salt: signer?.address,
  //           address: signer?.address,
  //         }),
  //       });
  //       const usersVaults = await getVaults.json();
  //       setVaults(usersVaults);
  //     })();
  //   }
  // }, [signer]);

  return (
    <Box style={{ maxHeight: '100vh' }}>
      <NavHeader />
      <Flex style={{ height: '90vh' }}>
        <Box style={{ width: '50%', paddingTop: 10 }}>
          <Center px={10} style={{ justifyContent: 'space-between' }}>
            <Menu shadow="md" width={200} withArrow>
              <Menu.Target>
                <Button
                  rightSection={<ChevronDown size={16} />}
                  leftSection={
                    signer?.address === currentUserToCheckBalanceAddress ? (
                      <Avatar size={28} />
                    ) : (
                      <ShieldLock size={20} />
                    )
                  }
                  variant="light"
                  color="gray"
                >
                  {!currentUserToCheckBalanceAddress && '???'}
                  {currentUserToCheckBalanceAddress == signer?.address && 'Me'}
                  {currentUserToCheckBalanceAddress ==
                    vaults?.[spendNetwork]?.address && 'Vault'}
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {/* {Object.entries(SUPPORTED_NETWORKS).map((chainEntry, i) => {
                  const [chainId, configs] = chainEntry;

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
                  })} */}
                <Menu.Item
                  onClick={() => {
                    setCurrentUserToCheckBalanceAddress(signer.address);
                  }}
                  leftSection={<Avatar size={28} />}
                >
                  Me
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    setCurrentUserToCheckBalanceAddress(
                      vaults[spendNetwork].address
                    );
                  }}
                  leftSection={<ShieldLock size={20} />}
                >
                  Vault
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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

          {!tokensInWallet?.length ? (
            <Center mt={15} style={{ flexDirection: 'column' }}>
              <Title order={3}>No tokens found in this wallet</Title>
            </Center>
          ) : (
            tokensInWallet?.map((token: TokenBalance, i) => {
              return (
                <Center
                  key={i}
                  style={{
                    background:
                      token.token_address === spendToken?.token_address
                        ? '#5A5959'
                        : '#2e2e2e',
                    marginTop: 3,
                    justifyContent: 'space-between',
                    padding: 15,
                  }}
                >
                  <Flex style={{ alignItems: 'baseline', gap: 5 }}>
                    <Title style={{ fontWeight: 600 }} order={5}>
                      {token.name}
                    </Title>

                    <Text size="xs" c="dimmed">
                      {/* @ts-expect-error */}
                      (Balance: {(token.balance / 10 ** 18).toPrecision(2)} $
                      {token.symbol})
                    </Text>
                  </Flex>
                  <Center>
                    <Checkbox
                      // mt={10}
                      onChange={() => {
                        if (token.token_address === spendToken?.token_address) {
                          setSpendToken(null);
                        } else setSpendToken(token);
                      }}
                      checked={
                        token.token_address === spendToken?.token_address
                      }
                      label="Spend"
                      labelPosition="left"
                    />
                  </Center>
                </Center>
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
            })
          )}
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

                    return (
                      <Menu.Item
                        onClick={async () => {
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
                              addNetwork(chainId);
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
          <NumberInput
            onChange={(e) => {
              setAmountOfTokenToSwap(+e);
            }}
            label="Amount of native token to bridge"
          />
          <Button
            mt={5}
            fullWidth
            onClick={async () => {
              // let safeSdk = await SafeFactory.create({ ethAdapter });

              // 0. Switch to spend chain
              // 1. convert ETH to WETH
              // 2. send to vault
              // 3. approve bridge for spending WETH
              // 4. call deposit V3

              try {
                // from spend network
                // const signerForSpendNetwork = signer.connect(
                //   new ethers.JsonRpcProvider(RPC_URLS[spendNetwork])
                // );

                // ethers.parseUnits(amountOfTokenToSwap,'wei')
                // let amountIn = amountOfTokenToSwap * 10 ** 18;
                // let amountIn = ethers.parseEther(String(amountOfTokenToSwap));
                // console.log(`amount`, amountIn);

                const spendVaultAddress = vaults[spendNetwork].address;
                const executionVaultAddress = vaults[currentNetwork].address;

                // NOTE: sign on execution chain
                const withdrawData = new ethers.Interface([
                  'function withdraw(uint wad)',
                ]).encodeFunctionData('withdraw', [8_000_000_000_000_000n]);
                //
                let jsonRpcProvider = new ethers.JsonRpcProvider(
                  RPC_URLS[currentNetwork]
                );
                console.log(`PROVIDER`, jsonRpcProvider);
                const executionEthAdapter = new EthersAdapter({
                  ethers,
                  signerOrProvider: jsonRpcProvider,
                });
                // for destintation chain
                let executionVault = await Safe.create({
                  ethAdapter: executionEthAdapter,
                  safeAddress: executionVaultAddress,
                });

                executionVault = await executionVault.connect({
                  ethAdapter: executionEthAdapter,
                  safeAddress: executionVaultAddress,
                });

                const unwrapHookData = makeBridgeTypedMessage(
                  [WETH_ON_NETWORK[currentNetwork]],
                  [withdrawData],
                  await executionVault.getNonce(),
                  +currentNetwork,
                  executionVaultAddress
                );
                const executionSignature = await signer.signTypedData(
                  unwrapHookData.domain,
                  unwrapHookData.types,
                  unwrapHookData.message
                );

                // NOTE: switch networks
                // @ts-expect-error
                await window?.ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        // switch to ETH sepolia tesnet
                        chainId: spendNetwork,
                      },
                    ],
                  })
                  .then(async () => {
                    const ethAdapter = new EthersAdapter({
                      ethers,
                      signerOrProvider: signer,
                    });

                    // Safe.
                    let spendVault = await Safe.create({
                      ethAdapter,
                      safeAddress: spendVaultAddress,
                    });

                    spendVault = await spendVault.connect({
                      ethAdapter,
                      safeAddress: spendVaultAddress,
                    });

                    // const sendEthToSpendingVault = await signer.sendTransaction({
                    //   to: spendVault,
                    //   value: ethers.parseUnits('0.01', 'ether'),
                    // });
                    // const sendEthToSpendingVaultTx =
                    //   await sendEthToSpendingVault.wait();
                    // if (sendEthToSpendingVaultTx.status === 1)
                    //   notifications.show({
                    //     message: 'Success sent ETH to vault!',
                    //     color: 'green',
                    //   });

                    // we've sent ETH to vault
                    // now bundle vault txs

                    const wethOnSpendNet = WETH_ON_NETWORK[spendNetwork];

                    const spokePoolContract = new ethers.Contract(
                      SPOKE_POOLS[spendNetwork],
                      spokePoolAbi.abi,
                      signer
                    );

                    const bridgeData = ethers.AbiCoder.defaultAbiCoder().encode(
                      ['address[]', 'bytes[]', 'bytes'],
                      [
                        unwrapHookData.message.targets,
                        unwrapHookData.message.data,
                        executionSignature,
                      ]
                    );

                    const bridgeTx =
                      await spokePoolContract.depositV3.populateTransaction(
                        spendVaultAddress,
                        executionVaultAddress,
                        wethOnSpendNet,
                        ethers.ZeroAddress,
                        1_000_000_000_000_000_0n,
                        8_000_000_000_000_000n,
                        +currentNetwork,
                        ethers.ZeroAddress,
                        Math.ceil(Date.now() / 1000),
                        Math.ceil(Date.now() / 1000) + 1800,
                        0,
                        bridgeData
                      );

                    const batchTransactions = [
                      {
                        // WRAP ETH
                        to: wethOnSpendNet,
                        value: '10000000000000000',
                        data: '0x',
                      },
                      // approve bridge for weth spend
                      {
                        to: wethOnSpendNet,
                        // value: ethers.parseUnits('0.01', 'ether'),
                        value: 0,
                        data: ethers.Interface.from(
                          erc20Abi
                        ).encodeFunctionData('approve', [
                          SPOKE_POOLS[spendNetwork],
                          ethers.MaxUint256,
                        ]),
                      },
                      {
                        to: bridgeTx.to,
                        // value: ethers.parseUnits('0.01', 'ether'),
                        value: '10000000000000000',
                        data: bridgeTx.data,
                      },
                      // bridge with deposit v3
                    ];

                    // // from vault
                    const bundledTxs = await spendVault.createTransaction({
                      transactions: batchTransactions,
                      onlyCalls: true,
                      options: { safeTxGas: '400000' },
                    });

                    console.log(`bundled txs`, bundledTxs);
                    const safeTx = await spendVault.executeTransaction(
                      bundledTxs
                    );

                    console.log(`SAFE TX`, safeTx);
                    const bridgeDone = await safeTx.transactionResponse.wait();

                    console.log(`BRIDGE DONE`, bridgeDone);
                  });
              } catch (err) {
                console.log(`ERROR reason`, err.reason);
                console.log(`ERROR message`, err.message);
              }
              //
              // const safeVault = new ethers.Contract(
              //   vaults[spendNetwork].address,
              //   safeVaultAbi.abi,
              //   signer
              // );
              // console.log(safeVault);

              // const sdk=Safe.create({ethAdapter,safeAddress:})
              // console.log(`the vaults`, vaults);

              //
            }}
          >
            Swap to native token
          </Button>

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
            <BridgeExecuteModal
              spendToken={spendToken}
              tokenToBuy={currentTokenToSwapTo}
              opened={opened}
              close={close}
            />
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

// <Accordion>
//   {currentNetwork &&
//     Object.entries(SWAP_TOKENS[currentNetwork]).map(
//       (tokenEntry) => {
//         const [tokenLp, configs] = tokenEntry;
//         return (
//           <Accordion.Item key={tokenLp} value={tokenLp}>
//             <Accordion.Control>
//               <Center
//                 style={{ justifyContent: 'flex-start', gap: 10 }}
//               >
//                 {/* @ts-expect-error */}
//                 <Image src={configs?.logo} style={{ width: 24 }} />
//                 <Title style={{ fontWeight: 600 }} order={5}>
//                   {tokenLp}
//                 </Title>
//               </Center>
//             </Accordion.Control>
//             <Accordion.Panel>
//               <Box>
//                 <NumberInput
//                   value={amountToBuy}
//                   onChange={(e) => {
//                     setAmountToBuy(+e);
//                   }}
//                   style={{ width: '100%' }}
//                   // @ts-expect-error
//                   label={configs.name}
//                   placeholder="Enter amount of tokens to purchase"
//                 />
//                 <Button
//                   onClick={() => {
//                     if (spendToken) {
//                       return notifications.show({
//                         color: 'red',
//                         message:
//                           'Please select a token to spend with.',
//                       });
//                     }
//                     open();
//                     // @ts-expect-error
//                     setCurrentTokenToSwapTo(configs);
//                     // open modal
//                     //
//                   }}
//                   mt={5}
//                   color="teal"
//                   fullWidth
//                 >
//                   Buy
//                 </Button>
//               </Box>
//             </Accordion.Panel>
//           </Accordion.Item>
//         );
//       }
//     )}
// </Accordion>
