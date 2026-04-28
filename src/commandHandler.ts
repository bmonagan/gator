import { setUser } from "./config";
import { createUser,getUser } from "./lib/db/queries/users";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0){
        throw new Error("the login handler expects a single argument, the username");
    }
    let username = args[0];
    setUser(username);
    console.log("User name has been set.");
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0){
        throw new Error("the register handler expects a single argument, the username");
    }
    const name = args[0];
    if (typeof name !== 'string') {
        throw new Error("Must include a name in the form of a string.");
    }
    if (getUser(name) !== undefined) {
        throw new Error("Name already in database.");
    }
    const createdUser = await createUser(name);
    setUser(name);
    console.log(`User ${name} was created`);
    console.log(createUser);

}