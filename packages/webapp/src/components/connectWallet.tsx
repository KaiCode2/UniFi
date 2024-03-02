import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { SignerContext } from '../Context/Signer';

import { Button, Text, Title } from '@mantine/core';
import theme from '../utils/theme';
import { decimalToHexChainId } from '../utils/helpers';
import { SUPPORTED_NETWORKS } from '../utils/chains';
import { CurrentNetworkContext } from '../Context/CurrentNetwork';

const ConnectWalletButton = () => {
  const { setSigner, signer } = useContext(SignerContext);
  const { currentNetwork, setCurrentNetwork } = useContext(
    CurrentNetworkContext
  );

  return signer ? (
    <Text size="md">{`${signer.address.slice(0, 5)}...${signer.address.slice(
      -4
    )}`}</Text>
  ) : (
    <Button
      radius="xl"
      // color="violet"
      style={{ background: theme.styles.colors.teal }}
      onClick={async () => {
        // @ts-expect-error
        if (window.ethereum) {
          // @ts-expect-error
          const provider = new ethers.BrowserProvider(window?.ethereum);
          const { chainId: chainNumber } = await provider.getNetwork();
          // @ts-expect-error
          const chainId = decimalToHexChainId(chainNumber);

          // TODO: add support for multiple wallets (if need be)
          await provider.send('eth_requestAccounts', []);
          const walletSigner = await provider.getSigner();
          setSigner(walletSigner);
          console.log(`current chainID`, chainId);
          if (!SUPPORTED_NETWORKS[chainId]) {
            // @ts-expect-error
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [
                {
                  // this is ETH sepolia tesnet
                  chainId: '0xaa36a7',
                },
              ],
            });
            setCurrentNetwork('0xaa36a7');
            return;
          }
          setCurrentNetwork(chainId);
        }
      }}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletButton;

// 11155420n;
