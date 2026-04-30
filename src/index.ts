import { buildCommandsRegistry, runCommand } from "./com_reg";
async function main() {
  const registry = buildCommandsRegistry();

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