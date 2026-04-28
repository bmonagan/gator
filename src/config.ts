/// <reference types="node" />
import fs, { write } from "fs";
import os from "os";
import path from "path";

export type Config = { 
    dbUrl: string,
    currentUserName: string
}

export function setUser(userName: string): void {
    const filePath = getConfigFilePath();
    let cfgOBJ = fs.readFileSync(filePath,'utf-8');
    let cfg = JSON.parse(cfgOBJ);
    cfg.currentUserName = userName;
    writeConfig(cfg);
}

function writeConfig(cfg: Config): void {



}

function getConfigFilePath() {
    const homedir = os.homedir()
    const config = "/.gatorconfig.json"
    const file_path = path.join(homedir,config);
    return file_path;

}