import { CommandsRegistry, runCommand } from "./com_reg";
import { setUser,readConfig } from "./config";
import { registerCommand } from "./com_reg";
import { CommandHandler, handlerLogin } from "./commandHandler";
function main() {
  const registry: CommandsRegistry = {};
  const login: CommandHandler = handlerLogin;
  registerCommand(registry, "login", login);
  let Fullargs:string[] = process.argv;
  let cmdName = Fullargs[0];
  let args = Fullargs.slice(1);
  if (!cmdName) {
    throw new Error("Args must contain the cmdName at a minimum");
  }
  runCommand(registry, cmdName, ...args);
}
main();