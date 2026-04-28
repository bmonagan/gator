/// <reference types="node" />
import fs, { write } from "fs";
import os from "os";
import path from "path";
import { config } from "process";

export type Config = { 
    dbUrl: string,
    currentUserName: string
}

export function setUser(userName: string): void {
    const filePath = getConfigFilePath();
    let cfgOBJ = fs.readFileSync(filePath,'utf-8');
    let cfg = JSON.parse(cfgOBJ);
    cfg.currentUserName = userName;
    fs.writeFileSync(filePath, JSON.stringify(cfg));
}
export function readConfig(): void { 
    const filePath = getConfigFilePath();

}


function getConfigFilePath() {
    const homedir = os.homedir()
    const config = "/.gatorconfig.json"
    const file_path = path.join(homedir,config);
    return file_path;

}

function validateConfig(rawConfig: any): Config { 
    const dbUrl = rawConfig.db_url;
    const currentUserName = rawConfig.current_user_name;
    if (!dbUrl || typeof dbUrl !== 'string') { 
        throw new Error("db_url field not valid");
    }
    if (!currentUserName || typeof currentUserName !== 'string') {
        throw new Error("currentUserName field not valid");
    }
    const config: Config = {
        dbUrl: dbUrl,
        currentUserName: currentUserName
    };
    return config;
}