import { task } from "hardhat/config";
import {
  getSingletonFactoryInfo,
  SingletonFactoryInfo,
} from "@safe-global/safe-singleton-factory";
import {
  getOmnaccountFallbackBytecode,
  getOmnaccountModuleBytecode,
} from "@/deploy/utils/deploy_singleton";
import deploySafeProxy, {
  calculateInitializer,
  calculateProxyAddress,
} from "@/deploy/utils/deploy_safe_proxy";
import * as SafeSdk from "@safe-global/protocol-kit";
import Safe from "@safe-global/safe-contracts/build/artifacts/contracts/Safe.sol/Safe.json";
import SafeProxyFactory from "@safe-global/safe-contracts/build/artifacts/contracts/proxies/SafeProxyFactory.sol/SafeProxyFactory.json";
import type { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getCreate2Address, keccak256, ZeroHash } from "ethers";
import { ISafe__factory } from "@/typechain-types/factories/contracts/interfaces/ISafe__factory";
import { IERC20__factory, OmnaccountModule__factory, V3SpokePoolInterface__factory } from "@/typechain-types";
import execSafeTransaction from "@/deploy/utils/exec_transaction";
import { Constants, delay, signatures } from "@/utils";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import {
  ContractNetworksConfig,
  EthersAdapter,
  hashSafeMessage,
} from "@safe-global/protocol-kit";
import {
  getMultiSendCallOnlyDeployment,
  getMultiSendDeployment,
} from "@safe-global/safe-deployments";

task("safe:make", "Makes a new safe")
  .addOptionalParam("signer", "Signer of the new safe")
  .addOptionalParam("salt", "safe generation salt")
  .setAction(
    async (
      { signer }: TaskArguments,
      { getNamedAccounts, ethers, deployments, network }: HardhatRuntimeEnvironment
    ) => {
      const { spokePool, owner } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const { chainId } = await ownerSigner.provider.getNetwork();
      const { address: factoryAddress } = getSingletonFactoryInfo(
        Number(chainId)
      ) as SingletonFactoryInfo;

      console.log(factoryAddress);

      let { address: omnaccountModuleAddress } = await deployments.get(
        Constants.Contracts.OmnaccountModule
      );
      let { address: omnaccountFallbackAddress } = await deployments.get(
        Constants.Contracts.OmnaccountFallback
      );

      const {
        safeMastercopyAddress,
        safeProxyFactoryAddress,
        omnaccountModuleAddress: predictedOmnaccountModuleAddress,
        omnaccountFallbackAddress: predictedOmnaccountFallbackAddress,
      } = await getAddresses(factoryAddress, spokePool);

      omnaccountModuleAddress =
        omnaccountModuleAddress ?? predictedOmnaccountModuleAddress;
      omnaccountFallbackAddress =
        omnaccountFallbackAddress ?? predictedOmnaccountFallbackAddress;

      // TODO: Check these addresses exist

      console.log(`Safe mastercopy: ${safeMastercopyAddress}`);
      console.log(`Safe proxy factory: ${safeProxyFactoryAddress}`);
      console.log(`Omnaccount module: ${omnaccountModuleAddress}`);
      console.log(`Omnaccount fallback: ${omnaccountFallbackAddress}`);

      const safeAddress = calculateProxyAddress(
        calculateInitializer(owner, omnaccountFallbackAddress),
        safeProxyFactoryAddress,
        safeMastercopyAddress
      );

      try {
        const deployedCode = await ownerSigner.provider.getCode(safeAddress);
        if (deployedCode === "0x") {
          console.log(`Safe at ${safeAddress} not deployed. Deploying...`);
          // Safe not deployed
          await deploySafeProxy(
            safeProxyFactoryAddress,
            safeMastercopyAddress,
            owner,
            ownerSigner,
            omnaccountFallbackAddress
          );
          if (network.live) await delay(5_000);
        }
      } catch {}

      console.log(`Safe address: ${safeAddress}`);

      const safe = ISafe__factory.connect(safeAddress, ownerSigner);

      if (!(await safe.isModuleEnabled(omnaccountModuleAddress))) {
        console.log("Enabling bridge module...");
        await execSafeTransaction(
          safe,
          await safe.enableModule.populateTransaction(omnaccountModuleAddress),
          ownerSigner
        );
        if (network.live) await delay(5_000);
      }
      if (!(await safe.isModuleEnabled(omnaccountFallbackAddress))) {
        console.log("Enabling fallback module...");
        await execSafeTransaction(
          safe,
          await safe.enableModule.populateTransaction(omnaccountFallbackAddress),
          ownerSigner
        );
        if (network.live) await delay(5_000);
      }

      console.log("Modules enabled!");

      await deployments.save("ISafe", {
        address: safeAddress,
        abi: Safe.abi,
      });
    }
  );

task("safe:sign", "Signs a safe transaction")
  .addPositionalParam("to", "Transaction destination")
  .addPositionalParam("data", "Transaction data")
  .addPositionalParam("chainId", "Chain ID")
  .addPositionalParam("nonce", "Receiving vault's nonce")
  .addOptionalParam("value", "Transaction value")
  .setAction(
    async (
      { to, data, chainId, nonce, value }: TaskArguments,
      { getNamedAccounts, ethers, deployments }: HardhatRuntimeEnvironment
    ) => {
      const { owner, spokePool } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const vaultDeployment = await deployments.getOrNull("ISafe");

      const { chainId: originChainId } = await ownerSigner.provider.getNetwork();
      const { address: factoryAddress } = getSingletonFactoryInfo(
        Number(originChainId)
      ) as SingletonFactoryInfo;
      const {
        safeMastercopyAddress,
        safeProxyFactoryAddress,
        omnaccountModuleAddress,
      } = await getAddresses(factoryAddress, spokePool);

      const safeAddress = calculateProxyAddress(
        calculateInitializer(owner),
        safeProxyFactoryAddress,
        safeMastercopyAddress
      );

      // const safe = ISafe__factory.connect(vaultDeployment?.address ?? safeAddress, ownerSigner);
      // const address = await safe.getAddress()
      // const nonce = await safe.nonce()

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: ownerSigner,
      });
      const multiSendAddress =
        getMultiSendDeployment({ network: originChainId.toString() })?.defaultAddress ??
        "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
      const multiSendCallOnlyAddress =
        getMultiSendCallOnlyDeployment({ network: originChainId.toString() })?.defaultAddress ??
        "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";

      // @ts-ignore
      const contractNetworks: ContractNetworksConfig = {
        // @ts-ignore
        [originChainId.toString()]: {
          multiSendAddress,
          multiSendCallOnlyAddress,
        },
      };
      const connection = await SafeSdk.default.create({
        ethAdapter,
        safeAddress: vaultDeployment?.address ?? safeAddress,
        contractNetworks,
      });

      const withdrawData = new ethers.Interface([
        "function withdraw(uint wad)",
      ]).encodeFunctionData("withdraw", [ethers.parseEther("1")]);
      const dataStruct = signatures.makeBridgeTypedMessage(["0x4200000000000000000000000000000000000006"], [withdrawData], parseInt(nonce), chainId, to)
      const message = connection.createMessage(dataStruct);

      const signedMessage = await connection.signMessage(message);
      console.log(signedMessage);

      const encodedSigs = signedMessage.encodedSignatures()
      console.log(encodedSigs)

      const hashed = hashSafeMessage(dataStruct);
      // safe.checkSignatures(hashed, signedMessage.signatures[0].data);

      // const tx = await execSafeTransaction(safe, args, ownerSigner);

      // console.log(`Transaction sent: ${tx.hash}`);

      // const receipt = await tx.wait();

      // if (receipt && receipt.status === 0) {
      //   console.error(`Transaction failed: ${tx.hash}`);
      //   return;
      // } else {
      //   console.log(`Transaction confirmed: ${tx.hash}`);
      // }
    }
  );

task("safe:bridge", "Executes a bridge transaction")
    .addPositionalParam("tokenIn", "Token address to execute once received")
    .addPositionalParam("tokenOut", "Token address to execute once received")
    .addPositionalParam("amountIn", "Amount to send in 18 decimal format")
    .addPositionalParam("amountOut", "Amount to receive in 18 decimal format")
    .addPositionalParam("chainId", "Chain ID to send to")
    .addOptionalParam("recipient", "address to send to")
    .addOptionalParam("message", "encoded message to include")
    .setAction(async (
      {tokenIn, tokenOut, amountIn, amountOut, chainId: destinationChainId, recipient, message}: TaskArguments,
      {
        getNamedAccounts,
        ethers,
        deployments,
        network,
      }: HardhatRuntimeEnvironment
    ) => {
      const { owner, spokePool, ...namedAccounts  } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);

      const moduleDeployment = await deployments.get(
        Constants.Contracts.OmnaccountModule
      );
      const vaultDeployment = await deployments.get("ISafe");
      const spokePoolContract = V3SpokePoolInterface__factory.connect(spokePool, ownerSigner);
      const chainId = await ownerSigner.provider
        .getNetwork()
        .then(({ chainId }) => chainId);

      const inputTokenAddress = ethers.isAddress(tokenIn) ? tokenIn : namedAccounts[tokenIn];

      const calldata = await spokePoolContract.depositV3.populateTransaction(
        vaultDeployment.address,
        recipient ?? vaultDeployment.address,
        inputTokenAddress,
        ethers.ZeroAddress,
        ethers.parseUnits(amountIn, 18),
        ethers.parseUnits(amountOut, 18),
        parseInt(destinationChainId),
        ethers.ZeroAddress,
        Math.ceil(new Date().getTime() / 1_000),
        Math.ceil(new Date().getTime() / 1_000) + 86_400,
        0,
        message ?? "0x"
      );

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: ownerSigner,
      });
      const multiSendAddress =
        getMultiSendDeployment({ network: chainId.toString() })?.defaultAddress ??
        "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
      const multiSendCallOnlyAddress =
        getMultiSendCallOnlyDeployment({ network: chainId.toString() })?.defaultAddress ??
        "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";

      // @ts-ignore
      const contractNetworks: ContractNetworksConfig = {
        // @ts-ignore
        [chainId.toString()]: {
          multiSendAddress,
          multiSendCallOnlyAddress,
        },
      };
      const connection = await SafeSdk.default.create({
        ethAdapter,
        safeAddress: vaultDeployment.address,
        contractNetworks,
      });

      let transactions = [];
      if (await IERC20__factory.connect(inputTokenAddress, ownerSigner).allowance(vaultDeployment.address, spokePool) < ethers.parseUnits(amountIn, 18)) {
        const approveTx = await IERC20__factory.connect(inputTokenAddress, ownerSigner).approve.populateTransaction(spokePool, ethers.MaxUint256);
        transactions.push({
          to: approveTx.to,
          value: "0",
          data: approveTx.data
        })
        console.log("Approving token...")
      } else {
        transactions.push({
          to: moduleDeployment.address,
          value: "0",
          data: calldata.data,
        });
        console.log("Sending bridge transaction...")
      }
      let safeTx = await connection.createTransaction({transactions});
      safeTx = await connection.signTransaction(safeTx);
      // await safeTx.addSignature()
      console.log(safeTx)
      const safeTxResponse = await connection.executeTransaction(safeTx);
      console.log(safeTxResponse)
      const response = await safeTxResponse.transactionResponse?.wait();

      console.log(response?.logs)
    });

task("safe:addFallback", "Adds a new token fallback handler")
  .addPositionalParam("token", "Token address to execute once received")
  .addPositionalParam("target", "address to call")
  .addPositionalParam("selector", "function selector")
  .addPositionalParam("data", "function data")
  .setAction(
    async (
      { token, target, selector, data }: TaskArguments,
      {
        getNamedAccounts,
        ethers,
        deployments,
        network,
      }: HardhatRuntimeEnvironment
    ) => {
      const { owner, spokePool } = await getNamedAccounts();
      let ownerSigner = await ethers.getSigner(owner);

      const moduleDeployment = await deployments.get(
        Constants.Contracts.OmnaccountModule
      );
      const vaultDeployment = await deployments.get("ISafe");
      const safe = ISafe__factory.connect(vaultDeployment.address, ownerSigner);
      const module = OmnaccountModule__factory.connect(
        moduleDeployment.address,
        ownerSigner
      );

      // const tx = await execSafeTransaction(
      //   safe,
      //   await safe.setFallbackHandler.populateTransaction(moduleDeployment.address),
      //   ownerSigner
      // );

      const address = await safe.getAddress();
      const chainId = await ownerSigner.provider
        .getNetwork()
        .then(({ chainId }) => chainId);
      const nonce = await safe.nonce();

      const calldata = await module.setTokenFallback.populateTransaction(
        token,
        {
          target,
          selector,
          data,
          addressIndex: 0,
          amountIndex: 0,
        }
      );

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: ownerSigner,
      });
      const multiSendAddress =
        getMultiSendDeployment({ network: chainId.toString() }) ??
        "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526";
      const multiSendCallOnlyAddress =
        getMultiSendCallOnlyDeployment({ network: chainId.toString() }) ??
        "0x9641d764fc13c8B624c04430C7356C1C7C8102e2";
      const contractNetworks: ContractNetworksConfig = {
        // @ts-ignore
        [chainId]: {
          multiSendAddress,
          multiSendCallOnlyAddress,
        },
      };
      const connection = await SafeSdk.default.create({
        ethAdapter,
        safeAddress: vaultDeployment.address,
        contractNetworks,
      });
      let safeTx = await connection.createTransaction({
        transactions: [
          {
            to: moduleDeployment.address,
            value: "0",
            data: calldata.data,
          },
        ],
      });
      safeTx = await connection.signTransaction(safeTx);
      // await safeTx.addSignature()
      const safeTxResponse = await connection.executeTransaction(safeTx);
      const response = await safeTxResponse.transactionResponse?.wait();

      console.log(response?.logs);
      // return;

      // const { domain, types, message } = createSafeTxParams(
      //   address,
      //   chainId,
      //   {
      //     to: moduleDeployment.address,
      //     data: calldata.data,
      //     value: 0,
      //   },
      //   nonce
      // );
      // console.log(1, address, chainId, calldata, nonce, domain, types, message);
      // const signature = await ownerSigner.signTypedData(domain, types, message);

      // const tx = await safe.execTransaction(
      //   moduleDeployment.address,
      //   0,
      //   calldata.data,
      //   0,
      //   0,
      //   0,
      //   0,
      //   ethers.ZeroAddress,
      //   ethers.ZeroAddress,
      //   signature
      // );

      // await module.setTokenFallback.populateTransaction(
      //   ethers.ZeroAddress, {
      //     target: ethers.ZeroAddress,
      //     selector: "0x8429f8d0",
      //     data: "0x",
      //     addressIndex: 0,
      //     amountIndex: 0,
      //   }),

      // {
      //   to: moduleDeployment.address,
      //   data: module.interface.encodeFunctionData("setTokenFallback", [
      //     token,
      //     {
      //       target,
      //       selector,
      //       data,
      //       addressIndex: 0,
      //       amountIndex: 0,
      //     },
      //   ])
      // },
      // const encoder = ethers.AbiCoder.defaultAbiCoder();
      // const callData = encoder.encode(
      //   ["address", "bytes4", "bytes", "uint96", "uint96"],
      //   [ethers.ZeroAddress, "0x8429f8d0", "0x", 0, 0]
      // );
      // const tx = await execSafeTransaction(
      //   safe,
      //   await safe.execTransaction.populateTransaction(
      //     moduleDeployment.address,
      //     0,
      //     await module.setTokenFallback.populateTransaction(
      //       ethers.ZeroAddress, {
      //         target: ethers.ZeroAddress,
      //         selector: "0x8429f8d0",
      //         data: "0x",
      //         addressIndex: 0,
      //         amountIndex: 0,
      //       }),
      //     0,
      //     1_000_000,
      //     30_000_000_000,
      //     30_000_000_000,
      //     owner,

      //   ),
      //   ownerSigner
      // );
    }
  );

async function getUserVault(signer: SignerWithAddress, spokePool: string) {
  const { chainId } = await signer.provider.getNetwork();
  const { address: factoryAddress } = getSingletonFactoryInfo(
    Number(chainId)
  ) as SingletonFactoryInfo;
  const {
    safeMastercopyAddress,
    safeProxyFactoryAddress,
    omnaccountModuleAddress,
    omnaccountFallbackAddress,
  } = await getAddresses(factoryAddress, spokePool);

  const safeAddress = calculateProxyAddress(
    calculateInitializer(signer.address, omnaccountFallbackAddress),
    safeProxyFactoryAddress,
    safeMastercopyAddress
  );

  const safe = ISafe__factory.connect(safeAddress, signer);

  return safe;
}

async function getAddresses(factory: string, spokePool: string) {
  const safeMastercopyAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(Safe.bytecode)
  );
  const safeProxyFactoryAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(SafeProxyFactory.bytecode)
  );
  const omnaccountModuleAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(getOmnaccountModuleBytecode(spokePool))
  );
  const omnaccountFallbackAddress = getCreate2Address(
    factory,
    ZeroHash,
    keccak256(getOmnaccountFallbackBytecode(spokePool, omnaccountModuleAddress))
  );

  return {
    safeMastercopyAddress,
    safeProxyFactoryAddress,
    omnaccountModuleAddress,
    omnaccountFallbackAddress,
  };
}
