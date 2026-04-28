import { CommandsRegistry, runCommand } from "./com_reg";
import { setUser,readConfig } from "./config";
import { registerCommand } from "./com_reg";
import { CommandHandler, handlerLogin, handlerRegister } from "./commandHandler";
async function main() {
  const registry: CommandsRegistry = {};
  const login: CommandHandler = handlerLogin;
  const register: CommandHandler = handlerRegister
  
  registerCommand(registry, "login", login);
  registerCommand(registry, "register",register);
  let Fullargs:string[] = process.argv;
  let cmdName = Fullargs[2];
  let args = Fullargs.slice(3);
  if (!cmdName) {
    throw new Error("Args must contain the cmdName at a minimum");
  }
  await runCommand(registry, cmdName, ...args);
  process.exit(0);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});