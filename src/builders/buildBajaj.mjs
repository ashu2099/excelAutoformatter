import ExcelJS from "exceljs";

import {
  BAJAJ_COLUMN_MAPPING,
  BAJAJ_COLUMNS_SPEC,
} from "../columnConfig/bajaj.mjs";

import { BRANDS } from "../constants.mjs";
import { sortAlphabetically } from "../utils/sortUtils.mjs";

import { performTransform } from "../sheetFunctions/performTransform.mjs";
import { addSummationRow } from "../sheetFunctions/addSummationRow.mjs";
import { applyBorder } from "../sheetFunctions/applyBorder.mjs";
import { markGrayCells } from "../sheetFunctions/markGrayCells.mjs";
import { setupColumnsWithOffset } from "../sheetFunctions/setupColumnsWithOffset.mjs";

/**
 * Main function to read, process, and write the Excel file based on strict mapping.
 */
export const buildBajaj = async (fileInfo) => {
  const processedData = await performTransform(
    fileInfo.inputPath,
    BAJAJ_COLUMN_MAPPING,
    BRANDS.BAJAJ
  );

  // 4. Create and Write the new XLSX file
  const outputWorkbook = new ExcelJS.Workbook();
  const outputWorksheet = outputWorkbook.addWorksheet("AutoFormatted Report");

  setupColumnsWithOffset(outputWorksheet, BAJAJ_COLUMNS_SPEC, 4);

  const sortedProcessedData = sortAlphabetically(
    processedData,
    BAJAJ_COLUMNS_SPEC[1].header,
    BAJAJ_COLUMNS_SPEC[0].header
  );

  // Add the processed data
  outputWorksheet.addRows(
    sortedProcessedData.map((row) => {
      // Map the object properties back to an array in the correct order for ExcelJS
      // using the order defined in BAJAJ_COLUMNS_SPEC
      return BAJAJ_COLUMNS_SPEC.map((col) => row[col.header]);
    })
  );

  addSummationRow(
    outputWorksheet,
    BAJAJ_COLUMNS_SPEC.slice(7).map((x) => x.header)
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
