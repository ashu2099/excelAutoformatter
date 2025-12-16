import ExcelJS from "exceljs";

import { BRANDS } from "../constants.mjs";
import { performTransform } from "../sheetFunctions/performTransform.mjs";
import { setupColumnsWithOffset } from "../sheetFunctions/setupColumnsWithOffset.mjs";
import { sortByDate } from "../utils/sortUtils.mjs";
import { addSummationRow } from "../sheetFunctions/addSummationRow.mjs";
import { applyBorder } from "../sheetFunctions/applyBorder.mjs";
import {
  SRIRAM_COLUMN_MAPPING,
  SRIRAM_COLUMNS_SPEC,
} from "../columnConfig/sriram.mjs";

/**
 * Main function to read, process, and write the Excel file based on strict mapping.
 */
export const buildSriRam = async (fileInfo) => {
  const processedData = await performTransform(
    fileInfo.inputPath,
    SRIRAM_COLUMN_MAPPING,
    BRANDS.SRIRAM
  );

  // 4. Create and Write the new XLSX file
  const outputWorkbook = new ExcelJS.Workbook();
  const outputWorksheet = outputWorkbook.addWorksheet("AutoFormatted Report");

  setupColumnsWithOffset(outputWorksheet, SRIRAM_COLUMNS_SPEC, 4);

  const sortedProcessedData = sortByDate(
    processedData,
    SRIRAM_COLUMNS_SPEC[4].header,
    SRIRAM_COLUMNS_SPEC[0].header
  );

  // Add the processed data
  outputWorksheet.addRows(
    sortedProcessedData.map((row) => {
      // Map the object properties back to an array in the correct order for ExcelJS
      // using the order defined in SRIRAM_COLUMNS_SPEC
      return SRIRAM_COLUMNS_SPEC.map((col) => row[col.header]);
    })
  );

  addSummationRow(
    outputWorksheet,
    SRIRAM_COLUMNS_SPEC.slice(6).map((x) => x.header)
  );

  applyBorder(outputWorksheet);

  try {
    await outputWorkbook.xlsx.writeFile(fileInfo.outputPath);
    console.log(
      `\nSuccess! The new Excel file has been saved to: ${fileInfo.outputPath}`
    );
  } catch (error) {
    console.error("Error writing the XLSX file:", error);
  }
};
