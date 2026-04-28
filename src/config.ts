/// <reference types="node" />
import fs from "fs";
import os from "os";
import path from "path";

export type Config = { 
    dbUrl: string,
    currentUserName: string
}

export function setUser(cfg: Config, userName: string): void {\
    const path = getConfigFilePath();
    const cfg = fs.readFileSync(path,'utf-8');


}

function writeConfig(cfg: Config): void {
    


}

function getConfigFilePath() {
    const homedir = os.homedir()
    const config = "/.gatorconfig.json"
    const file_path = path.join(homedir,config);
    return file_path;

}