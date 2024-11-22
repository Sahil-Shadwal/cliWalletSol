import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export async function sendSol(
  connection: Connection,
  sender: Keypair,
  recipientPublicKey: PublicKey,
  amountInSol: number
): Promise<void> {
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

  console.log(`Sent ${amountInSol} SOL to ${recipientPublicKey.toBase58()}`);
  console.log(`Transaction signature: ${signature}`);
}
