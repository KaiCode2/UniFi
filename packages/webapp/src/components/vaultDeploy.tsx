import baseLogo from '../../public/baseLogo.png';
import ethLogo from '../../public/ethLogo.png';

import { useContext, useEffect, useState } from 'react';
import { SignerContext } from '../Context/Signer';
import {
  Badge,
  Box,
  Text,
  Button,
  Card,
  Center,
  Group,
  Select,
  Title,
  Image,
  Divider,
} from '@mantine/core';
import { SUPPORTED_NETWORKS } from '../utils/chains';
import theme from '../utils/theme';
import { notifications } from '@mantine/notifications';
import { CurrentNetworkContext } from '../Context/CurrentNetwork';
import React from 'react';

const DeployVaultButton = () => {
  const { signer, setSigner } = useContext(SignerContext);

  const [loading, setLoading] = useState(false);

  const deployVaults = async () => {
    setLoading(true);
    const deploy = await fetch(`/api/safe/make`, {
      method: 'POST',
      body: JSON.stringify({
        address: signer?.address,
        salt: signer?.address,
        chainIds: Object.keys(SUPPORTED_NETWORKS),
      }),
    });
    const vaultsDeployedResponse = await deploy.json();
    if (vaultsDeployedResponse.success) {
      setLoading(false);
      return notifications.show({
        color: 'green',
        message: 'Successfully deployed vaults!',
      });
    }
    setLoading(false);
    return notifications.show({
      color: 'red',
      message: vaultsDeployedResponse.error,
    });
  };

  return (
    <Center pt="5%" style={{ flexDirection: 'column' }}>
      <Box w={400}>
        <Card pt={0} shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mt="md" mb="xs">
            <Title order={4}>Deploy Vaults</Title>
          </Group>
          <Divider />
          <Box mt={15}>
            <Center style={{ justifyContent: 'flex-start', gap: 10 }}>
              <Image src={baseLogo.src} style={{ width: 35 }} />
              <Text size="md">Base</Text>
            </Center>
            <Center mt={20} style={{ justifyContent: 'flex-start', gap: 10 }}>
              <Image src={ethLogo.src} style={{ width: 25 }} />
              <Text size="md">Ethereum</Text>
            </Center>
            <Text mt={10} size="xs" c="dimmed">
              This will deploy abstract wallets to both chains{' '}
            </Text>
          </Box>

          <Button
            size="xs"
            mt={5}
            fullWidth
            loading={loading}
            color={theme.styles.colors.teal}
            onClick={deployVaults}
            disabled={!signer}
          >
            {signer ? 'Deploy' : 'Connect wallet'}
          </Button>
        </Card>
      </Box>
    </Center>
  );
};

export default DeployVaultButton;
