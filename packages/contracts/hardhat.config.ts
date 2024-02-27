import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-toolbox";
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
      deploy: ["deploy/local"],
      tags: ["local"],
    },
    localhost: {
      deploy: ["deploy/local"],
      url: "http://127.0.0.1:8545",
      tags: ["local"],
    },
  },
  paths: {
    tests: "./test/mocha",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // typechain: {
  //   target: "ethers-v6",
  //   outDir: "./typechain",
  // },
};

export default config;
