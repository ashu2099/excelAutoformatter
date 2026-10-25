# Excel Autoformatter

A small Node.js utility for formatting and reordering Excel data files into brand-specific output templates.

This project reads files from an `input` folder, detects the brand from the filename, applies the appropriate transformation rules, and writes the formatted result to an `output` folder as an `.xlsx` file.

## Features

- Processes multiple files in a directory
- Reads source files from `./input`
- Writes formatted output to `./output`
- Produces XLSX output files automatically
