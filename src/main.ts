import { dateDiff } from "./lib.ts";
import { parseArgs } from "https://deno.land/std@0.217.0/cli/parse_args.ts";
import * as YAML from "https://deno.land/std@0.217.0/yaml/mod.ts";

const version = "v0.1.0";
const help = `datelta ${version}

Datelta calculates the difference between 2 dates with millisecond precision.

Options:
          --start     Start date (default: now).
          --end       End date (default: now).
          --fmt       Output format (default: json, options: json, yaml).
      -h, --help      Print help.
      -V, --version   Print version.`;

function main() {
  const flags = parseArgs(Deno.args, {
    boolean: ["help", "h", "version", "V"],
    string: ["start", "end", "fmt"],
  });
  const allowedFmts = ["json", "yaml"];

  if (flags.help || flags.h) {
    return console.log(help);
  } else if (flags.version || flags.V) {
    return console.log(version);
  }

  let startDate = new Date();
  let endDate = new Date();

  if (flags.start && flags.end) {
    startDate = new Date(flags.start);
    endDate = new Date(flags.end);
  } else if (flags.start) {
    startDate = new Date(flags.start);
  } else {
    return console.log(help);
  }

  const fmt = flags.fmt ?? "json";
  if (!allowedFmts.includes(fmt)) {
    return console.error(
      `invalid argument: fmt was "${fmt}" expected one of:`,
      allowedFmts,
    );
  }

  const dd = { ...dateDiff(startDate, endDate) };

  if (fmt === "json") {
    console.log(JSON.stringify(dd));
  } else if (fmt === "yaml") {
    console.log(YAML.stringify(dd));
  } else {
    return console.error(
      `invalid argument: fmt was "${fmt}" expected one of:`,
      allowedFmts,
    );
  }
}

if (import.meta.main) {
  main();
}
