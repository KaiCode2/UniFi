// 1. Deploy vault using safe sdk (supported by multiple chains)
// 2. Add module to vault (approval and sign)
// 3. Bridge tokens using APIs
import React from 'react';
import ConnectWalletButton from '../components/connectWallet';
import DeployVaultButton from '../components/vaultDeploy';
import { Anchor, Center, Title } from '@mantine/core';
import NavHeader from '../components/Header';

const TransferFunds = () => {
  // fontFamily: 'American Typewriter, serif',
  return (
    <>
      <NavHeader />
      <DeployVaultButton />
    </>
  );
};

export default TransferFunds;
