import ExcelJS from "exceljs";

import {
  GODIGIT_COLUMN_MAPPING,
  GODIGIT_COLUMNS_SPEC,
} from "../columnConfig/godigit.mjs";
import { BRANDS } from "../constants.mjs";
import { performTransform } from "../sheetFunctions/performTransform.mjs";
import { setupColumnsWithOffset } from "../sheetFunctions/setupColumnsWithOffset.mjs";
import { sortByDate } from "../utils/sortUtils.mjs";
import { addSummationRow } from "../sheetFunctions/addSummationRow.mjs";
import { applyBorder } from "../sheetFunctions/applyBorder.mjs";

/**
 * Main function to read, process, and write the Excel file based on strict mapping.
 */
export const buildGoDigit = async (fileInfo) => {
  const processedData = await performTransform(
    fileInfo.inputPath,
    GODIGIT_COLUMN_MAPPING,
    BRANDS.GODIGIT
  );

  // 4. Create and Write the new XLSX file
  const outputWorkbook = new ExcelJS.Workbook();
  const outputWorksheet = outputWorkbook.addWorksheet("AutoFormatted Report");

  setupColumnsWithOffset(outputWorksheet, GODIGIT_COLUMNS_SPEC, 4);

  const sortedProcessedData = sortByDate(
    processedData,
    GODIGIT_COLUMNS_SPEC[4].header,
    GODIGIT_COLUMNS_SPEC[0].header
  );

  // Add the processed data
  outputWorksheet.addRows(
    sortedProcessedData.map((row) => {
      // Map the object properties back to an array in the correct order for ExcelJS
      // using the order defined in GODIGIT_COLUMNS_SPEC
      return GODIGIT_COLUMNS_SPEC.map((col) => row[col.header]);
    })
  );

  addSummationRow(
    outputWorksheet,
    GODIGIT_COLUMNS_SPEC.slice(7).map((x) => x.header)
  );

  applyBorder(outputWorksheet);

  try {
    await outputWorkbook.xlsx.writeFile(fileInfo.outputPath);
    console.log(
      `\nSuccess! The new Excel file has been saved to: ${fileInfo.outputPath}`
    );
    console.log("------------------------------------------");
  } catch (error) {
    console.error("Error writing the XLSX file:", error);
  }
};
