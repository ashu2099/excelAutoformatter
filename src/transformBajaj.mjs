import ExcelJS from "exceljs";
import { sortAlphabetically } from "./sortUtils.mjs";
import { applyBorder } from "./applyBorder.mjs";
import { addSummationRow } from "./performSummation.mjs";
import { performTransform } from "./performTransform.mjs";
import { BRANDS } from "./constants.mjs";
import { markGrayCells } from "./markGrayCells.mjs";
import { setupColumnsWithOffset } from "./setupColumnsWithOffset.mjs";

// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.
const COLUMN_MAPPING = {
  // New column will be added dynamically: 'srno': null,
  "Policy No.": "Policy No.",
  "Customer Name": "Customer Name",
  "Regn No": "Regn No",
  "Issued Dt": "Policy Issued Date",
  "Inception Dt": "Risk Inception Date",
  "Expiry Dt": "Risk Expiry Date",
  "Od Prem": "Od Prem",
  "Tp Prem": "Tp Prem",
  "Net Prem": "Net Premium",
  "Gross Prem": "Gross Premium",
};

// 2. OUTPUT COLUMN DEFINITION (Defines order and properties)
// Key and header name  should be the same
const OUTPUT_COLUMNS_SPEC = [
  // This is the new, first column
  {
    header: "srno",
    width: 5,
    style: {
      alignment: {
        horizontal: "center",
      },
    },
  },
  // The remaining columns are defined strictly in the desired order
  {
    header: "Policy No.",
    width: 16,
    style: {
      alignment: {
        wrapText: true,
      },
    },
  },
  { header: "Customer Name", key: "Customer Name", width: 30 },
  {
    header: "Regn No",
    width: 15,
    style: {
      alignment: {
        horizontal: "center",
      },
    },
  },
  {
    header: "Expiry Dt",
    width: 10,
    style: {
      numFmt: "dd-mmm-yy",
      alignment: {
        horizontal: "center",
      },
    },
  },
  {
    header: "Issued Dt",
    width: 10,
    style: {
      numFmt: "dd-mmm-yy",
      alignment: {
        horizontal: "center",
      },
    },
  },
  {
    header: "Inception Dt",
    width: 10,
    style: {
      numFmt: "dd-mmm-yy",
      alignment: {
        horizontal: "center",
      },
    },
  },
  { header: "Od Prem", width: 8 },
  { header: "Tp Prem", width: 8 },
  { header: "Net Prem", width: 8 },
  { header: "Gross Prem", width: 8 },
];

/**
 * Main function to read, process, and write the Excel file based on strict mapping.
 */
export const transformBajaj = async (fileInfo) => {
  const processedData = await performTransform(
    fileInfo.inputPath,
    COLUMN_MAPPING,
    BRANDS.BAJAJ
  );

  // 4. Create and Write the new XLSX file
  const outputWorkbook = new ExcelJS.Workbook();
  const outputWorksheet = outputWorkbook.addWorksheet("Filtered Report");

  setupColumnsWithOffset(outputWorksheet, OUTPUT_COLUMNS_SPEC, 4);

  const sortedProcessedData = sortAlphabetically(
    processedData,
    OUTPUT_COLUMNS_SPEC[1].header,
    OUTPUT_COLUMNS_SPEC[0].header
  );

  // Add the processed data
  outputWorksheet.addRows(
    sortedProcessedData.map((row) => {
      // Map the object properties back to an array in the correct order for ExcelJS
      // using the order defined in OUTPUT_COLUMNS_SPEC
      return OUTPUT_COLUMNS_SPEC.map((col) => row[col.header]);
    })
  );

  addSummationRow(
    outputWorksheet,
    OUTPUT_COLUMNS_SPEC.slice(7).map((x) => x.header)
  );

  applyBorder(outputWorksheet);

  markGrayCells(outputWorksheet, 2);

  try {
    await outputWorkbook.xlsx.writeFile(fileInfo.outputPath);
    console.log(
      `\nSuccess! The new Excel file (Strictly Mapped) has been saved to: ${fileInfo.outputPath}`
    );
  } catch (error) {
    console.error("Error writing the XLSX file:", error);
  }
};
