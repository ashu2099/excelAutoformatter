import fs from "fs";
import ExcelJS from "exceljs";
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

  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    await workbook.xlsx.readFile(INPUT_FILE_PATH);

    worksheet = workbook.worksheets[0];
  } catch (error) {
    console.error("Error reading .xlsx file", error);
    return;
  }

  // Get the actual headers and create a quick lookup map (Header -> Column Index)
  // ExcelJS row.values is 1-indexed. We adjust to be 0-indexed for simplicity later.
  const actualHeaders = worksheet.getRow(1).values.filter((v) => v);

  const headerToIndexMap = {};
  actualHeaders.forEach((header, index) => {
    // Store the index of the column data (+1 because ExcelJS arrays are 1-indexed)
    headerToIndexMap[header] = index + 1;
  });

  // 3. Process data into an array of objects
  const processedData = [];
  let srNoCounter = 1;

  const endingRow = getEndingRow(worksheet.rowCount, COMPANY);

  // Start reading from the second row (data rows)
  for (let i = 2; i <= endingRow; i++) {
    const row = worksheet.getRow(i);
    const originalRowValues = row.values;

    const newRow = {};

    // Add the sequential serial number
    newRow["srno"] = srNoCounter++;

    // Iterate through the strict mapping to populate the new row
    for (const outputKey in COLUMN_MAPPING) {
      const inputKey = COLUMN_MAPPING[outputKey];
      const columnIndex = headerToIndexMap[inputKey];

      let value = "";
      if (columnIndex !== undefined) {
        // Get value using the 1-indexed column index

        value =
          originalRowValues[columnIndex] === null
            ? ""
            : originalRowValues[columnIndex];
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
