import { SUPPORTED_NETWORKS } from '@/utils/chains';
import { DEFAULT_TESTNET_TO_ADD, addNetwork } from '@/utils/helpers';
import ethers, { Signer } from 'ethers';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export const SignerContext = React.createContext<{
  signer: (ethers.Signer & { address: string }) | null;
  setSigner: React.Dispatch<Signer & { address: string }> | null;
}>({ setSigner: null, signer: null });

const SignerProvider = ({ children }: { children: JSX.Element }) => {
  const [signer, setSigner] = useState<Signer & { address: string }>(null);

  return (
    <SignerContext.Provider value={{ signer, setSigner }}>
      {children}
    </SignerContext.Provider>
  );
};

export default SignerProvider;
