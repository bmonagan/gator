import { CommandsRegistry, runCommand } from "./com_reg";
import { setUser,readConfig } from "./config";
import { registerCommand } from "./com_reg";
import { CommandHandler, handlerLogin, handlerRegister, handlerReset, handlerUsers, handlerAggregate } from "./commandHandler";
async function main() {
  // Create registry and command handlers for commands
  const registry: CommandsRegistry = {};
  const login: CommandHandler = handlerLogin;
  const register: CommandHandler = handlerRegister;
  const reset: CommandHandler = handlerReset;
  const users: CommandHandler = handlerUsers;
  const agg: CommandHandler = handlerAggregate;

  // Register Comnmands 
  registerCommand(registry, "login", login);
  registerCommand(registry, "register",register);
  registerCommand(registry, "reset", reset);
  registerCommand(registry, "users", users);
  registerCommand(registry,"agg",agg);

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