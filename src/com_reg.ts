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
    UserCommandHandler,
} from "./commandHandler";
import { readConfig } from "./config";
export type CommandsRegistry = Record<string, CommandHandler>;
type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

const middlewareLoggedIn: middlewareLoggedIn = (handler) => {
    return async (cmdName, ...args) => {
        const currentUser = readConfig().currentUserName;
        if (!currentUser) {
            throw new Error("You must be logged in to run this command.");
        }

        await handler(cmdName, ...args);
    };
};

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
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

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