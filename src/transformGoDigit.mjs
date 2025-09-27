import ExcelJS from "exceljs";
import { sortByDate } from "./sortUtils.mjs";
import { applyBorder } from "./applyBorder.mjs";
import { addSummationRow } from "./performSummation.mjs";
import { performTransform } from "./performTransform.mjs";
import { getFileNameAndPaths } from "./getFileNameAndPaths.mjs";
import { BRANDS } from "./constants.mjs";

// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.

const MonthFrag = "Aug25";

const COLUMN_MAPPING = {
  // Basic Policy/ID Fields
  "Policy Num": "policy_number",
  "Customer Name": "policy_holder",
  "Veh Num": "veh_reg_no",

  // Date Fields
  "Issue Dt": "policy_issue_date",
  "Inception Dt": "risk_inc_date",
  "Expiry Dt": "risk_exp_date",

  // Premium/Amount Fields
  "OD Prem": "od_premium",
  "TP Prem": "tp_premium", // Matches 'tp_premium' (correcting the typo 'premiu')
  "Net Prem": "net_premium_coll",
  "IRDA AMT": `IRDA_AMT_${MonthFrag}`,
  "REWARD AMT": `REWARD_AMT_${MonthFrag}`,
  "TOTAL AMT": `TOTAL_AMT_${MonthFrag}`,
};

// 2. OUTPUT COLUMN DEFINITION (Defines order and properties)
const OUTPUT_COLUMNS_SPEC = [
  // This is the new, first column
  {
    header: "srno",
    key: "srno",
    width: 5,
    style: {
      alignment: {
        horizontal: "center",
      },
    },
  },
  // The remaining columns are defined strictly in the desired order
  {
    header: "Policy Num",
    key: "Policy Num",
    width: 12,
    style: {
      alignment: {
        wrapText: true,
      },
    },
  },
  { header: "Customer Name", key: "Customer Name", width: 30 },
  {
    header: "Veh Num",
    key: "Veh Num",
    width: 15,
    style: {
      alignment: {
        horizontal: "center",
      },
    },
  },
  {
    header: "Expiry Dt",
    key: "Expiry Dt",
    width: 10,
    style: {
      numFmt: "dd-mmm-yy",
      alignment: {
        horizontal: "center",
      },
    },
  },
  {
    header: "Issue Dt",
    key: "Issue Dt",
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
    key: "Inception Dt",
    width: 10,
    style: {
      numFmt: "dd-mmm-yy",
      alignment: {
        horizontal: "center",
      },
    },
  },
  { header: "OD Prem", key: "OD Prem", width: 8 },
  { header: "TP Prem", key: "TP Prem", width: 8 },
  { header: "Net Prem", key: "Net Prem", width: 8 },
  { header: "IRDA AMT", key: "IRDA AMT", width: 8 },
  { header: "REWARD AMT", key: "REWARD AMT", width: 8 },
  { header: "TOTAL AMT", key: "TOTAL AMT", width: 8 },
];

/**
 * Main function to read, process, and write the Excel file based on strict mapping.
 */
const transformGoDigit = async () => {
  const filePaths = await getFileNameAndPaths();

  const processedData = await performTransform(
    filePaths.inputPath,
    COLUMN_MAPPING,
    BRANDS.GODIGIT
  );

  // 4. Create and Write the new XLSX file
  const outputWorkbook = new ExcelJS.Workbook();
  const outputWorksheet = outputWorkbook.addWorksheet("AutoFormatted Report");

  // Set the columns using the strict specification (order and width are enforced here)
  outputWorksheet.columns = OUTPUT_COLUMNS_SPEC;

  const sortedProcessedData = sortByDate(
    processedData,
    OUTPUT_COLUMNS_SPEC[4].header,
    OUTPUT_COLUMNS_SPEC[0].header
  );

  // Add the processed data
  outputWorksheet.addRows(
    sortedProcessedData.map((row) => {
      // Map the object properties back to an array in the correct order for ExcelJS
      // using the order defined in OUTPUT_COLUMNS_SPEC
      return OUTPUT_COLUMNS_SPEC.map((col) => row[col.key]);
    })
  );

  addSummationRow(
    outputWorksheet,
    OUTPUT_COLUMNS_SPEC.slice(7).map((x) => x.header)
  );

  applyBorder(outputWorksheet);

  try {
    await outputWorkbook.xlsx.writeFile(filePaths.outputPath);
    console.log(
      `\nSuccess! The new Excel file (Strictly Mapped) has been saved to: ${filePaths.outputPath}`
    );
  } catch (error) {
    console.error("Error writing the XLSX file:", error);
  }
};

// Execute the main function
transformGoDigit();
