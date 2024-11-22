import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function requestAirdrop(
  connection: Connection,
  publicKey: PublicKey,
  amountInSol: number
): Promise<void> {
  const signature = await connection.requestAirdrop(
    publicKey,
    amountInSol * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(signature);
  console.log(`Airdropped ${amountInSol} SOL to ${publicKey.toBase58()}`);
}
