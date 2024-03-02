import ethers, { Signer } from 'ethers';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SignerContext } from './Signer';
import { SUPPORTED_NETWORKS } from '@/utils/chains';
import { DEFAULT_TESTNET_TO_ADD, addNetwork } from '@/utils/helpers';

export const CurrentNetworkContext = React.createContext<{
  currentNetwork: string | null;
  setCurrentNetwork: React.Dispatch<string> | null;
}>({ setCurrentNetwork: null, currentNetwork: null });

const CurrentNetworkProvider = ({ children }: { children: JSX.Element }) => {
  const [currentNetwork, setCurrentNetwork] = useState<string>(null);
  const { setSigner, signer } = useContext(SignerContext);

  useEffect(() => {
    if (signer) {
      // whenever user switches off of our network (and not to a supported network)
      // @ts-expect-error
      window?.ethereum.on('chainChanged', (newChainId) => {
        // newly switched to chain ID is not supported
        if (!SUPPORTED_NETWORKS[newChainId]) {
          try {
            // @ts-expect-error
            window?.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [
                {
                  // switch to ETH sepolia tesnet
                  chainId: DEFAULT_TESTNET_TO_ADD,
                },
              ],
            });
          } catch (err) {
            if (err.code === 4902) {
              (async () => {
                // add sepolia
                await addNetwork(DEFAULT_TESTNET_TO_ADD);
                const provider = new ethers.BrowserProvider(
                  // @ts-expect-error
                  window?.ethereum
                );
                // set new signer with newly added network
                const walletWithNewNetwork = await provider.getSigner();
                setSigner(walletWithNewNetwork);
                setCurrentNetwork(DEFAULT_TESTNET_TO_ADD);
              })();
            }
          }
        }
      });

      // they haven't changed, but they just entered
      (async () => {
        // @ts-expect-error
        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        console.log(`currentChainId`, currentChainId);
        if (!SUPPORTED_NETWORKS[currentChainId]) {
          // force switch networks
          try {
            // @ts-expect-error
            window?.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [
                {
                  // switch to ETH sepolia tesnet
                  chainId: DEFAULT_TESTNET_TO_ADD,
                },
              ],
            });
          } catch (err) {
            if (err.code === 4902) {
              (async () => {
                // add sepolia
                await addNetwork(DEFAULT_TESTNET_TO_ADD);
                const provider = new ethers.BrowserProvider(
                  // @ts-expect-error
                  window?.ethereum
                );
                // set new signer with newly added network
                const walletWithNewNetwork = await provider.getSigner();
                setSigner(walletWithNewNetwork);
                setCurrentNetwork(DEFAULT_TESTNET_TO_ADD);
              })();
            }
          }
        }
      })();
    }
  }, [signer]);

  return (
    <CurrentNetworkContext.Provider
      value={{ currentNetwork, setCurrentNetwork }}
    >
      {children}
    </CurrentNetworkContext.Provider>
  );
};

export default CurrentNetworkProvider;
