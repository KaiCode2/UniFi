import React, { useContext } from "react";
import { ethers } from "ethers";
import { SignerContext } from "../Context/Signer";
import { chainIds, getChainInfo } from "../utilities/chains";

// const chainId1 = 11155111;
// const chainInfo1 = getChainInfo(chainId1);
// console.log(chainInfo1.name);
// console.log(chainInfo1.providerUrl);

// const chainId2 = 421614;
// const chainInfo2 = getChainInfo(chainId2);
// console.log(chainInfo2.name);
// console.log(chainInfo2.providerUrl);

// const chainId3 = 11155420;
// const chainInfo3 = getChainInfo(chainId3);
// console.log(chainInfo3.name);
// console.log(chainInfo3.providerUrl);

const ConnectWalletButton = () => {
  const { setSigner, signer } = useContext(SignerContext);
  console.log(signer);
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        // @ts-expect-error
        if (window.ethereum) {
          console.log("ethers", ethers);
          // @ts-expect-error
          const provider = new ethers.BrowserProvider(window?.ethereum);
          const { chainId } = await provider.getNetwork();
          console.log(chainId);

          try {
            const accounts = await provider.send("eth_requestAccounts", []);
            const walletSigner = await provider.getSigner();
            console.log(walletSigner);
            setSigner(walletSigner);
          } catch (error) {
            if (error.code === 4001) {
              alert("User rejected wallet connection");
              console.log("User rejected wallet connection");
            } else {
              console.error("Error connecting wallet:", error);
            }
          }
          if (!chainIds[String(chainId)]) {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: "0xaa36a7",
                },
              ],
            });
          }
        }
      }}
      className="connect-button"
      style={{ float: "right", borderRadius: "100px" }}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
