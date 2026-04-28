import { defineConfig } from "drizzle-kit";
import {readConfig} from "./src/config"

export default defineConfig({
  schema: "src/<path_to_schema>",
  out: "src/<path_to_generated_files>",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});