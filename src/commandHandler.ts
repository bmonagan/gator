import { setUser,readConfig } from "./config";
import { createUser,getUser,delUsers,listUsers } from "./lib/db/queries/users";
import { createFeed } from "./lib/db/queries/feeds";
import {fetchFeed} from "./feed";
import { printFeed } from "./printFeed";


export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0){
        throw new Error("the login handler expects a single argument, the username");
    }
    let username = args[0];
    if ((await getUser(username)) === undefined) {
        throw new Error("Username does not exist in database.");
    }
    setUser(username);
    console.log("User name has been set.");
}

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0){
        throw new Error("the register handler expects a single argument, the username");
    }
    const name = args[0];
    if ((await getUser(name)) !== undefined) {
        throw new Error("Name already in database.");
    }
    const createdUser = await createUser(name);
    setUser(name);
    console.log(`User ${name} was created`);
    console.log(createdUser);
}

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await delUsers();
    console.log("Users deleted successfully");
}

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const user_list = await listUsers();
    const current_user = readConfig().currentUserName;
    for (const user of user_list) {
        let expr = `* ${user.name}`;
        if (user.name === current_user) {
            expr += " (current)";
        }
        console.log(expr);
    }
}

export async function handlerAggregate(cmdName: string, ...args: string[]): Promise<void> {
    // PLACEHOLDER 
    // if (!args[0] || typeof(args[0]) !== 'string' ) {
    //     throw new Error("Must include a url as an argument");
    // }
    // const feedURL = args[0];
    const feedURL = "https://www.wagslane.dev/index.xml";
    const RSSFeed = await fetchFeed(feedURL);
    console.log(JSON.stringify(RSSFeed, null, 2));
}

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    if (!args[0] || typeof args[0] !== 'string') {
        throw new Error("Must include the name of the feed as an argument");
    }
    if (!args[1] || typeof args[1] !== 'string') {
        throw new Error("Must include url of the feed as an argument");
    }
    const name = args[0];
    const url = args[1];
    const current_user = readConfig().currentUserName;
    if (!current_user) {
        throw new Error("No user logged in.");
    }
    const user = await getUser(current_user);
    if (!user) {
        throw new Error("No logged-in user found.");
    }
    const feed = await createFeed(name, url, user.id);
    printFeed(feed,user);
}