import { generateKeypair } from "./generateKeypair";
import { requestAirdrop } from "./requestAirdrop";
import { sendSol } from "./sendSol";
import { setupReadline } from "../util/readline";
import { Connection, PublicKey } from "@solana/web3.js";

async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const rl = setupReadline();

  console.log("Welcome to the Solana CLI Wallet");

  const keypair = generateKeypair();

  rl.question(
    "Do you want to request an airdrop? (yes/no): ",
    async (answer) => {
      if (answer.toLowerCase() === "yes") {
        rl.question("Enter the amount of SOL to airdrop: ", async (amount) => {
          await requestAirdrop(
            connection,
            keypair.publicKey,
            parseFloat(amount)
          );
          rl.question(
            "Do you want to send SOL? (yes/no): ",
            async (sendAnswer) => {
              if (sendAnswer.toLowerCase() === "yes") {
                rl.question("Enter the recipient public key: ", (recipient) => {
                  rl.question(
                    "Enter the amount of SOL to send: ",
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
                });
              } else {
                rl.close();
              }
            }
          );
        });
      } else {
        rl.close();
      }
    }
  );
}

main().catch(console.error);
