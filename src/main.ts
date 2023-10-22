import { dateDiff } from "./lib.ts";
import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";

const version = "v0.0.3";
const help = `Usage: datelta ${version}

Datelta calculates the difference between 2 dates.

Options:
          --start     Start date
          --end       End date
      -h, --help      Print help
      -V, --version   Print version`;

function main() {
  const flags = parse(Deno.args, {
    boolean: ["help", "h", "version", "V"],
    string: ["start", "s", "end", "e"],
    default: { color: true },
  });

  if (flags.help || flags.h) {
    return console.log(help);
  } else if (flags.version || flags.V) {
    return console.log(version);
  }

  let startDate, endDate;

  if (flags.start) {
    startDate = new Date(flags.start);
    endDate = new Date();
  }

  if (flags.start && flags.end) {
    startDate = new Date(flags.start);
    endDate = new Date(flags.end);
  }

  if (!startDate) {
    console.error("Error: Start date is required.");
  } else if (startDate && endDate) {
    const diff = dateDiff(startDate, endDate);
    console.log(JSON.stringify(diff));
  }
}

if (import.meta.main) {
  main();
}
