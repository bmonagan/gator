import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => void;

function handlerLOgin(cmdName: string, ...args: string[]): void {
    if (args.length === 0){
        throw new Error("the login handler expects a single argument, the username");
    }
    let username = args[0];
    setUser(username);
    console.log("User name has been set.");
}