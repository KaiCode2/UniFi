import ethers from "ethers";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

export const SignerContext = React.createContext<{
  signer: ethers.Signer | null;
  setSigner: React.Dispatch<ethers.Signer> | null;
}>({ setSigner: null, signer: null });

const SignerProvider = ({ children }: { children: JSX.Element }) => {
  const [signer, setSigner] = useState<ethers.Signer>(null);
  console.log("children", children);

  return (
    <SignerContext.Provider value={{ signer, setSigner }}>
      {children}
    </SignerContext.Provider>
  );
};

export default SignerProvider;
