import { Modal, Title } from '@mantine/core';
import { TokenBalance } from '@/interfaces';
import { TokenToBuy } from '@/pages/swap';

const BridgeExecuteModal = ({
  spendToken,
  close,
  opened,
  tokenToBuy,
}: {
  spendToken: TokenBalance;
  tokenToBuy: TokenToBuy;
  opened: boolean;
  close: () => void;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
      }}
    >
      <Title>Swap </Title>
    </Modal>
  );
};
export default BridgeExecuteModal;
