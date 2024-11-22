import * as readline from "readline";

export function setupReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}
