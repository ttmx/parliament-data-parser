# parlamento

A command-line tool to browse and search through Portuguese parliamentary initiatives.

## Features

- List all parliamentary initiatives with basic information
- Detailed view with verbose information using the `-v` flag
- Force update of data using the `-u` flag
- Interactive fuzzy search through initiatives using the `-f` flag (requires fzf)


# Quick setup and run
```bash
git clone git@github.com:ttmx/parliament-data-parser.git; cd parliament-data-parser; bun i; bun run src/index.ts
```

## Installation

To install dependencies:

```bash
bun install
```

You'll also need [fzf](https://github.com/junegunn/fzf) installed for the fuzzy search feature:

```bash
# On macOS with Homebrew
brew install fzf

# On Ubuntu/Debian
apt-get install fzf

# On Arch Linux
pacman -S fzf
```

## Usage

Basic usage to list all initiatives:

```bash
bun run index.ts
```

With verbose output:

```bash
bun run index.ts -v
```

Force update of data:

```bash
bun run index.ts -u
```

Interactive fuzzy search:

```bash
bun run index.ts -f
```

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
