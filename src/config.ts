/// <reference types="node" />
import fs, { write } from "fs";
import os from "os";
import path from "path";
import { config } from "process";

export type Config = { 
    dbUrl: string,
    currentUserName: string | undefined
}

export function setUser(userName: string): void {
    const filePath = getConfigFilePath();
    let cfg = readConfig();
    cfg.currentUserName = userName;
    fs.writeFileSync(filePath, JSON.stringify(cfg));
}
export function readConfig(): Config { 
    const filePath = getConfigFilePath();
    let cfgOBJ = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    const cfg = validateConfig(cfgOBJ);
    return cfg;

}

function getConfigFilePath() {
    const homedir = os.homedir()
    const config = "/.gatorconfig.json"
    const file_path = path.join(homedir,config);
    return file_path;

}

function validateConfig(rawConfig: any): Config { 
    if (rawConfig === null || typeof rawConfig !== "object") {
        throw new Error("config is not an object");
    }
    const dbUrl = rawConfig.db_url;
    console.log(dbUrl);
    const currentUserName = rawConfig.current_user_name;
    if (!dbUrl || typeof dbUrl !== 'string') { 
        throw new Error("db_url field not valid");
    }
    if (currentUserName && typeof currentUserName !== 'string') {
        throw new Error("currentUserName field not valid");
    }
    const config: Config = {
        dbUrl: dbUrl,
        currentUserName: currentUserName
    };
    return config;
}