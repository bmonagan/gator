import { CommandHandler } from "./commandHandler";
export type CommandsRegistry = Record<string, CommandHandler>;

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}