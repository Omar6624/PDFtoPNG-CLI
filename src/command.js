import fs from "node:fs/promises";
import path from "node:path";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { validateHeaderName } from "node:http";
import { createOutputDir, validatePath } from "./util.js";

yargs(hideBin(process.argv))
  .command(
    "convert <link>",
    "Link to the directory",
    (yargs) => {
      return yargs.positional("link", {
        describe: "Directoirty link",
        type: "string",
      });
    },
    async (argv) => {
      const PATH = argv.link;
      const isValid = await validatePath(PATH);
      if (isValid) {
        await createOutputDir(PATH);
      } else {
        console.error("FAILED");
      }
    }
  )
  .help()
  .demandCommand(1)
  .parse();
