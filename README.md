# Datelta (Date + Delta = Datelta)

CLI tool to diff dates with millisecond precision and support for multiple
output formats (e.g. json, yaml).

## Quick Start

- Install [Deno](https://docs.deno.com/runtime/manual/#install-deno)
- Run `deno task install`
- Run `datelta --start "Jan 1, 1990" | jq`

## Usage

Time between start date and end date.

```
datelta --start "jan 10, 1990 12:30:01" --end "feb 2002" | jq
```

```json
{
  "years": 12,
  "months": 0,
  "days": 24,
  "hours": 11,
  "minutes": 29,
  "seconds": 59,
  "milliseconds": 0
}
```

Time since start date.

```
datelta --start "mar 2006" | jq
```

```json
{
  "years": 17,
  "months": 7,
  "days": 28,
  "hours": 19,
  "minutes": 42,
  "seconds": 36,
  "milliseconds": 428
}
```

## Commands

| Task                | Description                      |
| ------------------- | -------------------------------- |
| deno task install   | Install datelta as an executable |
| deno task uninstall | Uninstall datelta                |
| deno task dev       | Start development mode           |
