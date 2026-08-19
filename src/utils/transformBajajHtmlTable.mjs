import fs from "fs/promises";

const HTML_TABLE_PATTERN = /<table\b[^>]*>[\s\S]*<\/table\s*>/i;
const ROW_PATTERN = /<tr\b[^>]*>([\s\S]*?)<\/tr\s*>/gi;
const CELL_PATTERN = /<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]\s*>/gi;
const PREMIUM_HEADERS = new Set([
  "Od Prem",
  "Tp Prem",
  "Net Prem",
  "Gross Prem",
]);

const decodeHtml = (value) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#(\d+);/g, (_, characterCode) =>
      String.fromCharCode(Number(characterCode))
    )
    .trim();

const parseBajajDate = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  const match = value.match(/^(\d{2})-([A-Z]{3})-(\d{2})$/i);
  if (!match) {
    return value;
  }

  const months = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };
  const month = months[match[2].toUpperCase()];

  if (month === undefined) {
    return value;
  }

  // ExcelJS serializes JavaScript Date values in UTC. Using local noon avoids a
  // time-zone conversion moving a date-only Bajaj value into the previous day.
  return new Date(2000 + Number(match[3]), month, Number(match[1]), 12);
};

const parseBajajNumber = (value) => {
  const normalizedValue = String(value).replace(/,/g, "").trim();

  if (normalizedValue === "") {
    return "";
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue)) {
    return value;
  }

  return parsedValue;
};

/**
 * Parses Bajaj's website export, which is an HTML table saved with an .xls
 * extension. Returns null for normal Excel files so the shared transform can
 * continue handling those sources.
 */
export const transformBajajHtmlTable = async (inputPath, columnMapping) => {
  const source = await fs.readFile(inputPath, "utf8");

  if (!HTML_TABLE_PATTERN.test(source)) {
    return null;
  }

  const rows = [...source.matchAll(ROW_PATTERN)].map((rowMatch) =>
    [...rowMatch[1].matchAll(CELL_PATTERN)].map((cellMatch) =>
      decodeHtml(cellMatch[1])
    )
  );
  const [headers, ...sourceRows] = rows;

  if (!headers || headers.length === 0) {
    throw new Error("Bajaj HTML export does not contain a header row.");
  }

  const headerToIndex = new Map(
    headers.map((header, index) => [header, index])
  );
  const requiredHeaders = Object.values(columnMapping);
  const missingHeaders = requiredHeaders.filter(
    (header) => !headerToIndex.has(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `Bajaj HTML export is missing mapped headers: ${missingHeaders.join(", ")}`
    );
  }

  return sourceRows
    .filter((row) => row.some((value) => value !== ""))
    .filter((row) => row[headerToIndex.get("Sum Insured")] !== "Total")
    .map((sourceRow, rowIndex) => {
      const transformedRow = { srno: rowIndex + 1 };

      for (const [outputHeader, inputHeader] of Object.entries(columnMapping)) {
        const value = sourceRow[headerToIndex.get(inputHeader)] ?? "";
        if (PREMIUM_HEADERS.has(outputHeader)) {
          transformedRow[outputHeader] = parseBajajNumber(value);
        } else if (
          ["Issued Dt", "Inception Dt", "Expiry Dt"].includes(outputHeader)
        ) {
          transformedRow[outputHeader] = parseBajajDate(value);
        } else {
          transformedRow[outputHeader] = value;
        }
      }

      return transformedRow;
    });
};
