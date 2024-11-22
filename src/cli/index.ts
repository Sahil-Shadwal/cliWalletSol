import { generateKeypair } from "./generateKeypair";
import { requestAirdrop } from "./requestAirdrop";
import { sendSol } from "./sendSol";
import { setupReadline } from "../util/readline";
import { Connection, PublicKey } from "@solana/web3.js";
import { styles } from "../util/styling";

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const rl = setupReadline();

  console.log(styles.title("Solana CLI Wallet"));
  console.log(styles.box("Welcome to your Solana wallet interface!"));

  const keypair = generateKeypair();

  rl.question(
    styles.info("\n💫 Do you want to request an airdrop? (yes/no): "),
    async (answer) => {
      if (answer.toLowerCase() === "yes") {
        rl.question(
          styles.info("💎 Enter the amount of SOL to airdrop: "),
          async (amount) => {
            await requestAirdrop(
              connection,
              keypair.publicKey,
              parseFloat(amount)
            );
            rl.question(
              styles.info("\n💸 Do you want to send SOL? (yes/no): "),
              async (sendAnswer) => {
                if (sendAnswer.toLowerCase() === "yes") {
                  rl.question(
                    styles.info("🏦 Enter the recipient public key: "),
                    (recipient) => {
                      rl.question(
                        styles.info("💰 Enter the amount of SOL to send: "),
                        async (sendAmount) => {
                          await sendSol(
                            connection,
                            keypair,
                            new PublicKey(recipient),
                            parseFloat(sendAmount)
                          );
                          rl.close();
                        }
                      );
                    }
                  );
                } else {
                  rl.close();
                }
              }
            );
          }
        );
      } else {
        rl.close();
      }
    }
  );
}

main().catch((error) => {
  console.log(styles.error(`An error occurred: ${error.message}`));
});
