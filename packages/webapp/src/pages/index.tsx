// 1. Deploy vault using safe sdk (supported by multiple chains)
// 2. Add module to vault (approval and sign)
// 3. Bridge tokens using APIs
import React from "react";
import ConnectWalletButton from "../components/connectWallet";

const TransferFunds = () => {
  return (
    <>
      <header>
        <h1>Omnaccounts</h1>
        <ConnectWalletButton />
        <nav>
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Omniwallet</a>
          <a href="#">About Us</a>
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
