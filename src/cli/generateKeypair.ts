import { Keypair } from "@solana/web3.js";

export function generateKeypair(): Keypair {
  const keypair = Keypair.generate();
  console.log("Generated new keypair:");
  console.log("Public Key:", keypair.publicKey.toBase58());
  console.log("Private Key:", keypair.secretKey.toString());
  return keypair;
}
