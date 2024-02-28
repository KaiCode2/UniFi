try {
  // Check if user is on Chain A
  if (chainId1) {
    // Your code for handling user on Chain A
  }
} catch (error) {
  // Handle error
}

try {
  // Check if user is on Chain B
  if (chainId2) {
    // Your code for handling user on Chain B
  }
} catch (error) {
  // Handle error
}

try {
  // Check if user is on Chain C
  if (chainId3) {
    // Your code for handling user on Chain C
  }
} catch (error) {
  // Handle error
}

// If user is not on any of the chains, connect them to a specific one
if (!chainId1 && !chainId2 && !chainId3) {
  window.ethereum.request({
    method: "wallet_addSepoliaChain",
    params: [
      {
        chainId: "0xaa36a7",
        rpcUrls: ["wss://ethereum-sepolia-rpc.publicnode.com"],
        chainName: "SepoliaEth",
      },
    ],
  });
}

window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x89",
      rpcUrls: ["https://rpc-mainnet.matic.network/"],
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
  ],
});

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
          console.log("User rejected wallet connection");
        } else {
          console.error("Error connecting wallet:", error);
        }
      }

      // Check if user is on Chain A
      if (chainId1) {
        // Your code for handling user on Chain A
      }

      // Check if user is on Chain B
      if (chainId2) {
        // Your code for handling user on Chain B
      }

      // Check if user is on Chain C
      if (chainId3) {
        // Your code for handling user on Chain C
      }

      if (!chainId1 && !chainId2 && !chainId3) {
        window.ethereum.request({
          method: "wallet_addSepoliaChain",
          params: [
            {
              chainId: "0xaa36a7",
              rpcUrls: ["wss://ethereum-sepolia-rpc.publicnode.com"],
              chainName: "SepoliaEth",
            },
          ],
        });
      }
    }
  }}
  className="connect-button"
  style={{ float: "right" }}
>
  Connect Wallet
</button>;
