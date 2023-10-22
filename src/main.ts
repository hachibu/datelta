import { dateDiff } from "./lib.ts";
import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";

const version = "v0.0.3";
const help = `Usage: datelta ${version}

Datelta calculates the difference between 2 dates.

Options:
          --start     Start date (default: now).
          --end       End date (default: now).
      -h, --help      Print help.
      -V, --version   Print version.`;

function main() {
  const flags = parse(Deno.args, {
    boolean: ["help", "h", "version", "V"],
    string: ["start", "end"],
  });

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
  }

  const diff = dateDiff(startDate, endDate);
  const diffJSON = JSON.stringify(diff);

  console.log(diffJSON);
}

if (import.meta.main) {
  main();
}
