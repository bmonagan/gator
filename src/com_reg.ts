import { CommandHandler } from "./commandHandler";
export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (!Object.hasOwn(registry,cmdName)){
        throw new Error("Command name must be in the registry.");
    }
    else {
        await registry[cmdName](cmdName, ...args)
    }
}