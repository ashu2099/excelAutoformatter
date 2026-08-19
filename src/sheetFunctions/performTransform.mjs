import fs from "fs";
import XLSX from "xlsx";
import { getEndingRow } from "./getEndingRow.mjs";

export const performTransform = async (
  INPUT_FILE_PATH,
  COLUMN_MAPPING,
  COMPANY
) => {
  console.log(`\n--- Starting Excel Data Processing ---`);
  console.log(`Input File: ${INPUT_FILE_PATH}`);

  if (!fs.existsSync(INPUT_FILE_PATH)) {
    console.error(`Error: Input file not found at ${INPUT_FILE_PATH}.`);
    return;
  }

  let worksheet;

  try {
    const workbook = XLSX.readFile(INPUT_FILE_PATH, { cellDates: true });
    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!worksheet) {
      throw new Error("The workbook does not contain a worksheet.");
    }
  } catch (error) {
    console.error("Error reading Excel file", error);
    return;
  }

  // Convert the first sheet to rows. SheetJS supports XLSX, XLS and XLSB inputs.
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: true,
    defval: "",
    blankrows: false,
  });

  // Get the actual headers and create a quick lookup map (Header -> Column Index).
  const actualHeaders = rows[0] ?? [];

  const headerToIndexMap = {};
  actualHeaders.forEach((header, index) => {
    if (header) {
      headerToIndexMap[header] = index;
    }
  });

  // 3. Process data into an array of objects
  const processedData = [];
  let srNoCounter = 1;

  const endingRow = getEndingRow(rows.length, COMPANY);

  // Start reading from the second row (data rows). SheetJS arrays are 0-indexed.
  for (let rowIndex = 1; rowIndex < endingRow; rowIndex++) {
    const originalRowValues = rows[rowIndex] ?? [];

    const newRow = {};

    // Add the sequential serial number
    newRow["srno"] = srNoCounter++;

    // Iterate through the strict mapping to populate the new row
    for (const outputKey in COLUMN_MAPPING) {
      const inputKey = COLUMN_MAPPING[outputKey];
      const columnIndex = headerToIndexMap[inputKey];

      let value = "";
      if (columnIndex !== undefined) {
        value = originalRowValues[columnIndex] ?? "";
      } else {
        // This warning indicates a configuration error in COLUMN_MAPPING
        console.warn(
          `Input column not found for key: ${inputKey}. Setting value to empty string.`
        );
      }

      // Assign value to the output key (e.g., newRow['Policy No.'] = value)
      newRow[outputKey] = value;
    }

    processedData.push(newRow);
  }

  console.log(`\nSuccessfully processed ${processedData.length} data rows.`);

  return processedData;
};
