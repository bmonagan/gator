import {
    CommandHandler,
    handlerAddFeed,
    handlerAggregate,
    handlerFeeds,
    handlerFollow,
    handlerFollowing,
    handlerLogin,
    handlerRegister,
    handlerReset,
    handlerUsers,
} from "./commandHandler";
export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
	registry[cmdName] = handler;
}

export function buildCommandsRegistry(): CommandsRegistry {
    const registry: CommandsRegistry = {};

    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAggregate);
    registerCommand(registry, "addfeed", handlerAddFeed);
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", handlerFollow);
    registerCommand(registry, "following", handlerFollowing);

    return registry;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    if (!Object.hasOwn(registry,cmdName)){
        throw new Error("Command name must be in the registry.");
    }
    else {
        await registry[cmdName](cmdName, ...args)
    }
}