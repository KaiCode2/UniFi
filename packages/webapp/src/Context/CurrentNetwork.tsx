import ethers, { Signer } from 'ethers';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export const CurrentNetworkContext = React.createContext<{
  currentNetwork: string | null;
  setCurrentNetwork: React.Dispatch<string> | null;
}>({ setCurrentNetwork: null, currentNetwork: null });

const CurrentNetworkProvider = ({ children }: { children: JSX.Element }) => {
  const [currentNetwork, setCurrentNetwork] = useState<string>(null);

  return (
    <CurrentNetworkContext.Provider
      value={{ currentNetwork, setCurrentNetwork }}
    >
      {children}
    </CurrentNetworkContext.Provider>
  );
};

export default CurrentNetworkProvider;
