// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.
export const BAJAJ_COLUMN_MAPPING = {
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
export const BAJAJ_COLUMNS_SPEC = [
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
