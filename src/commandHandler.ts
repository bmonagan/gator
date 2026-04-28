import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0){
        throw new Error("the login handler expects a single argument, the username");
    }
    let username = args[0];
    setUser(username);
    console.log("User name has been set.");
}