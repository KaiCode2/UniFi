import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-network-helpers";
// import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
// import "hardhat-typechain"; // TODO: Readd


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.23", // TODO: Bump to 0.8.24
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            "*": {
              "*": ["storageLayout"],
            },
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
      loggingEnabled: true,
      // accounts,
      saveDeployments: true,
      autoImpersonate: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    tests: "./test/mocha",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    spokePool: {
      default: "0xaACB5245bc1A36dF875F76F6cb13369e60f60885", // TODO: Update
    },
    entrypoint: {
      default: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // TODO: Update
    },
  }
  // typechain: {
  //   target: "ethers-v6",
  //   outDir: "./typechain",
  // },
};

export default config;
