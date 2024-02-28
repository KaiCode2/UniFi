import { ethers } from "ethers";
import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

import { useContext, useState } from "react";
import { SignerContext } from "../Context/Signer";

import { SafeTransaction } from "@safe-global/safe-core-sdk-types";
// import { SafeAccountConfig } from "@safe-global/protocol-kit";

import { SafeAccountConfig } from "@safe-global/protocol-kit";

const chainIds = [11155111, 421614, 11155420];

const DeployVaultButton = () => {
  const { signer } = useContext(SignerContext);
  const [selectedChain, setSelectedChain] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deployVault = async () => {
    if (selectedChain === null) {
      setError("Please select a chain to deploy the vault.");
      return;
    }

    setLoading(true);
    setError(null);

    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/demo"
    );

    try {
      const safeAccountConfig: SafeAccountConfig = {
        owners: [signer.address],
        threshold: 1,
      };

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });

      const safeFactory = await SafeFactory.create({ ethAdapter });

      // @ts-expect-error
      const safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: signer.address,

        predictedSafe: {
          safeAccountConfig,
        },
      });

      const deployed = await safeFactory.deploySafe({ safeAccountConfig });
      console.log("deployed?", deployed);

      console.log("Vault deployed successfully on chain:", selectedChain);
      setLoading(false);
    } catch (error) {
      console.error("Failed to deploy vault:", error);
      setError("Failed to deploy vault. Please try again.");
      setLoading(false);
    }
  };

  const handleChainSelect = (chainId: number) => {
    setSelectedChain(chainId);
  };

  return (
    <>
      <button onClick={deployVault} disabled={!selectedChain || loading}>
        {loading ? "Deploying..." : "Deploy Vault"}
      </button>
      {error && <p>{error}</p>}
      {selectedChain === null && (
        <div>
          <p>Select chain to deploy vault:</p>
          {chainIds.map((chainId) => (
            <button
              key={chainId}
              onClick={() => handleChainSelect(chainId)}
              disabled={loading}
            >
              Chain {chainId}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default DeployVaultButton;
