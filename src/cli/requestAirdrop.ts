import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { styles } from "../util/styling";
import ora from "ora";

export async function requestAirdrop(
  connection: Connection,
  publicKey: PublicKey,
  amountInSol: number
): Promise<void> {
  const spinner = ora("Requesting airdrop...").start();
  try {
    const signature = await connection.requestAirdrop(
      publicKey,
      amountInSol * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
    spinner.succeed(
      styles.success(`Airdropped ${amountInSol} SOL to ${publicKey.toBase58()}`)
    );
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(styles.error(`Airdrop failed: ${error.message}`));
    } else {
      spinner.fail(styles.error(`Airdrop failed: ${String(error)}`));
    }
  }
}
