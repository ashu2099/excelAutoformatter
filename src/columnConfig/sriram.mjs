// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.
export const SRIRAM_COLUMN_MAPPING = {
  // New column will be added dynamically: 'srno': null,
  "Policy No.": "Dpollno",
  "Customer Name": "Insuredname",
  "Regn No": "VehicleNo",
  "Expiry Dt": "DOE",
  "Inceptn Dt": "DOI",
  "Od Prem": "OD_TOTAL",
  "Tp Prem": "TP_TOTAL",
  GrossAmt: "GrossAmt",
  ODCommAmt: "ODCommAmt",
  TPCommAmt: "TPCommAmt",
  TotalCommAmt: "TotalCommAmt",
};

// 2. OUTPUT COLUMN DEFINITION (Defines order and properties)
// Key and header name  should be the same
export const SRIRAM_COLUMNS_SPEC = [
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
    header: "Inceptn Dt",
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
  { header: "GrossAmt", width: 8 },
  { header: "ODCommAmt", width: 8 },
  { header: "TPCommAmt", width: 8 },
  { header: "TotalCommAmt", width: 8 },
];
