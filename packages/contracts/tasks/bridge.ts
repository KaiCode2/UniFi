import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import {
  AbiCoder,
  concat,
  getCreate2Address,
  Interface,
  keccak256,
  ZeroAddress,
  ZeroHash,
} from "ethers";

task("bridge", "Send funds via across")
  .addPositionalParam("token", "Address of token to send")
  .addPositionalParam("amount", "Amount to send")
  .addPositionalParam("chainId", "Chain ID to send to")
  .setAction(
    async (
      { token, amount, chainId }: TaskArguments,
      { getNamedAccounts, ethers }: HardhatRuntimeEnvironment
    ) => {
      const { spokePool: spokePoolAddress, owner } = await getNamedAccounts();
      const ownerSigner = await ethers.getSigner(owner);
      const spokePool = await ethers.getContractAt(
        "V3SpokePoolInterface",
        spokePoolAddress,
        ownerSigner
      );

      console.log(`Sending ${amount} of ${token} to chain ${chainId}`)

      const timeNow = Math.ceil(new Date().getTime() / 1_000);
      let tx = await spokePool.depositV3(
        owner,
        owner,
        token,
        ZeroAddress,
        ethers.parseEther(amount),
        Math.floor((parseInt(amount) ** 18 * 4) / 5),
        parseInt(chainId),
        ZeroAddress,
        timeNow,
        timeNow + 86_400,
        0,
        ""
      );

      console.log(`Deposit tx: ${tx.hash}`);
    }
  );
