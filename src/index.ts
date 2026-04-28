import { CommandsRegistry } from "./com_reg";
import { setUser,readConfig } from "./config";
import { registerCommand } from "./com_reg";
import { CommandHandler, handlerLogin } from "./commandHandler";
function main() {
  const registry: CommandsRegistry = {};
  const login: CommandHandler = handlerLogin;
  registerCommand(registry, "login", login);
  let Fullargs:string[] = process.argv;
  let cmdName = Fullargs.slice(0,1);
  let args = Fullargs.slice(1);
  if (cmdName.length === 0) {
    throw new Error("Args must contain the cmdName at a minimum");
  }
}
main();