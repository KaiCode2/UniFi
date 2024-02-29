// 1. Deploy vault using safe sdk (supported by multiple chains)
// 2. Add module to vault (approval and sign)
// 3. Bridge tokens using APIs
import React from "react";
import ConnectWalletButton from "../components/connectWallet";
import DeployVaultButton from "../components/vaultDeploy";

const TransferFunds = () => {
  return (
    <>
      <style>{`body { background-color: #232D3F; }`}</style>
      <header>
        <h1
          style={{
            fontFamily: "American Typewriter, serif",
          }}
        >
          Omnaccounts
        </h1>
        <div
          style={{
            textAlign: "right",
            fontFamily: "'American Typewriter', serif",
            color: "white",
            marginTop: "-35px",
          }}
        >
          <div
            style={{
              transform: "translateX(-200px)",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <a
              href="#"
              style={{
                margin: "0 20px",
                textDecoration: "none",
                color: "white",
              }}
              className="active"
            >
              Home
            </a>
            <a
              href="#"
              style={{
                margin: "0 20px",
                textDecoration: "none",
                color: "white",
              }}
            >
              Omniwallet
            </a>
            <a
              href="#"
              style={{
                margin: "0 20px",
                textDecoration: "none",
                color: "white",
              }}
            >
              About Us
            </a>
          </div>
        </div>
        <ConnectWalletButton />

        <DeployVaultButton />
      </header>
      <form>
        <div>
          <label
            style={{
              color: "white",
              fontFamily: "'American Typewriter', serif",
            }}
            htmlFor="amount1"
          >
            Amount 1:
          </label>
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
          <label
            style={{
              color: "white",
              fontFamily: "'American Typewriter', serif",
            }}
            htmlFor="amount2"
          >
            Amount 2:
          </label>
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
          style={{
            borderRadius: "100px",
          }}
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
