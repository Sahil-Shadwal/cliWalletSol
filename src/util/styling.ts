import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

export const styles = {
  title: (text: string) => {
    return gradient.pastel.multiline(
      figlet.textSync(text, {
        font: "Small",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    );
  },

  info: (text: string) => chalk.cyan(text),
  success: (text: string) => chalk.green(`✔ ${text}`),
  error: (text: string) => chalk.red(`✖ ${text}`),
  warning: (text: string) => chalk.yellow(`⚠ ${text}`),

  box: (text: string) => {
    return boxen(text, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
    });
  },

  keypairInfo: (publicKey: string, privateKey: string) => {
    return boxen(
      `${chalk.cyan("Public Key:")} ${chalk.white(publicKey)}\n\n` +
        `${chalk.cyan("Private Key:")} ${chalk.gray(privateKey)}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "yellow",
      }
    );
  },
};
