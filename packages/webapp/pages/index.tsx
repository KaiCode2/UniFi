// 1. build basic front end
// 2.
// 3.
import { ethers } from "ethers";
import { useMemo } from "react";
import type { Chain, Client, Transport } from "viem";
import { Config, useClient } from "wagmi";

const TransferFunds = () => {
  return (
    <>
      <header>
        <h1>Omnaccounts</h1>
        <nav>
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Omniwallet</a>
          <a href="#">About Us</a>
          <button
            onClick={async (e) => {
              e.preventDefault();
              // @ts-expect-error
              if (window.ethereum) {
                console.log(ethers);
                // @ts-expect-error
                const provider = new ethers.BrowserProvider(window?.ethereum);

                await provider.send("eth_requestAccounts", []);

                const signer = provider.getSigner();
              }
            }}
            className="connect-wallet-btn"
            style={{ float: "right" }}
          >
            Connect Wallet
          </button>
        </nav>
      </header>
      <form>
        <div>
          <label htmlFor="amount1">Amount 1:</label>
          <input
            type="number"
            id="amount1"
            name="amount1"
            min="0"
            step="1"
            pattern="\d*"
            inputMode="numeric"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="amount2">Amount 2:</label>
          <input
            type="number"
            id="amount2"
            name="amount2"
            min="0"
            step="1"
            pattern="\d*"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            // Do nothing, button is empty
          }}
          className="submit-btn"
        >
          Exchange Funds
        </button>
      </form>
    </>
  );
};

export default TransferFunds;

// const IndexPage = () => {
//   return (

//   );
// };

// export default IndexPage;
