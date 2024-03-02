import { Center, Title, Anchor } from '@mantine/core';
import ConnectWalletButton from '../connectWallet';

const NavHeader = () => {
  return (
    <Center
      p={20}
      style={{ justifyContent: 'space-between', background: '#18181C' }}
    >
      <Center style={{ gap: 40, alignItems: 'baseline' }}>
        <Title>UniFi</Title>

        <Anchor
          className="deploy-nav-link"
          underline="never"
          href="/"
          size="lg"
          style={{ color: 'white' }}
        >
          Deploy
        </Anchor>
        <Anchor href="/swap"
          className="deploy-nav-link"
          underline="never"
          size="lg"
          style={{ color: 'white' }}
        >
          Cross-chain Spending
        </Anchor>
      </Center>

      <ConnectWalletButton />
    </Center>
  );
};
export default NavHeader;
