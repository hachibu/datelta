import { dateDiff } from "./lib.ts";
import { parseArgs } from "https://deno.land/std@0.217.0/cli/parse_args.ts";
import * as YAML from "https://deno.land/std@0.217.0/yaml/mod.ts";

const version = "v0.1.0";
const help = `datelta ${version}

Datelta calculates the difference between 2 dates with millisecond precision.

Options:
      -b, --beg       Beginning date (default: now).
      -e, --end       Ending date (default: now).
      -f, --fmt       Output format (default: json, options: json, yaml).
      -h, --help      Print help.
      -V, --version   Print version.`;

function main() {
  const allowedFmts = ["json", "yaml"];
  const flags = parseArgs(Deno.args, {
    boolean: ["help", "h", "version", "V"],
    string: ["beg", "b", "end", "e", "fmt", "f"],
  });

  flags.help ??= flags.h;
  flags.version ??= flags.V;
  flags.beg ??= flags.b;
  flags.end ??= flags.e;
  flags.fmt ??= flags.f;

  if (flags.help) {
    return console.log(help);
  } else if (flags.version) {
    return console.log(version);
  }

  let begDate = new Date();
  let endDate = new Date();

  if (flags.beg && flags.end) {
    begDate = new Date(flags.beg);
    endDate = new Date(flags.end);
  } else if (flags.beg) {
    begDate = new Date(flags.beg);
  } else {
    return console.log(help);
  }

  const fmt = flags.fmt ?? "json";
  if (!allowedFmts.includes(fmt)) {
    return console.error(
      `invalid argument: fmt was "${fmt}" expected one of:`,
      allowedFmts
    );
  }

  const dd = { ...dateDiff(begDate, endDate) };

  if (fmt === "json") {
    console.log(JSON.stringify(dd));
  } else if (fmt === "yaml") {
    console.log(YAML.stringify(dd));
  } else {
    return console.error(
      `invalid argument: fmt was "${fmt}" expected one of:`,
      allowedFmts
    );
  }
}

if (import.meta.main) {
  main();
}
