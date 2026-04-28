import { setUser,readConfig } from "./config";
function main() {
  const name = "Benny";
  setUser(name);
  console.log(readConfig());
}

main();