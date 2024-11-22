import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { styles } from "../util/styling";
import ora from "ora";

export async function sendSol(
  connection: Connection,
  sender: Keypair,
  recipientPublicKey: PublicKey,
  amountInSol: number
): Promise<void> {
  const spinner = ora("Processing transaction...").start();
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amountInSol * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      sender,
    ]);

    spinner.succeed(
      styles.success(
        `Sent ${amountInSol} SOL to ${recipientPublicKey.toBase58()}`
      )
    );
    console.log(styles.info(`Transaction signature: ${signature}`));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    spinner.fail(styles.error(`Transaction failed: ${errorMessage}`));
  }
}
