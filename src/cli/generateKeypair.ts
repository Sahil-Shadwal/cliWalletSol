import { Keypair } from "@solana/web3.js";
import { styles } from "../util/styling";

export function generateKeypair(): Keypair {
  const keypair = Keypair.generate();
  console.log(styles.info("\n🔑 Generated new keypair:"));
  console.log(
    styles.keypairInfo(
      keypair.publicKey.toBase58(),
      keypair.secretKey.toString()
    )
  );
  return keypair;
}
