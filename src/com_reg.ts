import { CommandHandler } from "./commandHandler";
export type CommandsRegistry = Record<string, CommandHandler>;

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (!Object.hasOwn(registry,cmdName)){
        throw new Error("Command name must be in the registry.");
    }
    else {
        registry[cmdName](cmdName, ...args)
    }
}