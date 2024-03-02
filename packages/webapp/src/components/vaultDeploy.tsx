import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { SignerContext } from '../Context/Signer';
import { Box, Button, Center, Select, Title } from '@mantine/core';
import { selectableChains, SUPPORTED_NETWORKS } from '../utils/chains';
import theme from '../utils/theme';
import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
import { SafeAccountConfig } from '@safe-global/protocol-kit';
import { notifications } from '@mantine/notifications';
import { decimalToHexChainId } from '../utils/helpers';
import { CurrentNetworkContext } from '../Context/CurrentNetwork';
import React from 'react';

const DeployVaultButton = () => {
  const { signer, setSigner } = useContext(SignerContext);
  const { currentNetwork, setCurrentNetwork } = useContext(
    CurrentNetworkContext
  );

  const [loading, setLoading] = useState(false);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  const deployVault = async () => {
    setLoading(true);

    try {
      const safeAccountConfig: SafeAccountConfig = {
        owners: [signer.address],
        threshold: 1,
      };

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      // allows us to deploy vaults w/ Safe
      const safeFactory = await SafeFactory.create({ ethAdapter });
      console.log(`after factory`);
      // // @ts-expect-error
      // const safeSdk = await Safe.create({
      //   ethAdapter,
      //   safeAddress: signer.address,

      //   predictedSafe: {
      //     safeAccountConfig,
      //   },
      // });

      const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });

      console.log('safe vault', safeSdk);
      const newSafeAddress = await safeSdk.getAddress();
      console.log(`new vault address`, newSafeAddress);

      setLoading(false);
    } catch (error) {
      console.log(error);
      notifications.show({
        color: 'red',
        message: error?.reason,
      });

      setLoading(false);
    }
  };

  return (
    <Center pt="5%" style={{ flexDirection: 'column' }}>
      <Box w={400}>
        <Select
          disabled={!signer}
          value={currentNetwork}
          label="Chain to create wallet on"
          placeholder="e.g. Ethereum"
          onChange={async (e) => {
            if (e) {
              try {
                // switch to chain they want to deploy vault on
                // @ts-expect-error
                await window?.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [
                    {
                      // this is ETH sepolia tesnet
                      chainId: e,
                    },
                  ],
                });
                // NOTE: refresh the signer with new network connection
                // @ts-expect-error
                const provider = new ethers.BrowserProvider(window?.ethereum);
                const signerWithNewNetwork = await provider.getSigner();
                setSigner(signerWithNewNetwork);
              } catch (err) {
                // add network if they don't have it added to metamask
                if (err.code == 4902) {
                  const { name, decimals, symbol, rpcUrl } =
                    SUPPORTED_NETWORKS[e].token;
                  console.log(SUPPORTED_NETWORKS[e]);
                  // @ts-expect-error
                  await window?.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainName: SUPPORTED_NETWORKS[e].chainName,
                        chainId: e,
                        nativeCurrency: {
                          name,
                          decimals,
                          symbol,
                        },
                        rpcUrls: [rpcUrl],
                      },
                    ],
                  });
                  // @ts-expect-error
                  const provider = new ethers.BrowserProvider(window?.ethereum);
                  const signerWithNewNetwork = await provider.getSigner();
                  setSigner(signerWithNewNetwork);
                }
              }
              setCurrentNetwork(e);
            }
          }}
          data={selectableChains}
        />
        <Button
          mt={10}
          fullWidth
          loading={loading}
          color={theme.styles.colors.teal}
          onClick={deployVault}
          disabled={!currentNetwork || !signer}
        >
          Deploy Vault
        </Button>
      </Box>
    </Center>
  );
};

export default DeployVaultButton;
