// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.
export const MAGMA_COLUMN_MAPPING = {
  // New column will be added dynamically: 'srno': null,
  "Policy No.": "Policy No",
  "Customer Name": "CUSTOMER_NAME",
  "Regn No": "RTO Code",
  "Expiry Dt": "Risk End Date",
  "Inceptn Dt": "INC_DATE",
  "Net Prem": "NET_PREM",
  "Od Prem": "OD_PREM",
  "Tp Prem": "TP/TRS_PREM",
  "Total Comm %": "Total Comm Rate%",
  "IRDA Amt-OD": "IRDA Amt-OD",
  "IRDA Amt-TP": "IRDA Amt-TP",
  "Total IRDA": "Total IRDA",
  "Addtnl Comm %": "Additional Commission % OD",
  "Final Addtnl Comm": "Final Additional Commission Amount",
  "Total Comm": "Total Commission",
  Cycle: "Cycle",
};

// 2. OUTPUT COLUMN DEFINITION (Defines order and properties)
// Key and header name  should be the same
export const MAGMA_COLUMNS_SPEC = [
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
  {
    header: "Customer Name",
    key: "Customer Name",
    width: 20,
    style: {
      alignment: {
        wrapText: true,
        vertical: "top",
      },
    },
  },
  {
    header: "Regn No",
    width: 8,
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
  { header: "Net Prem", width: 8 },
  { header: "Od Prem", width: 8 },
  { header: "Tp Prem", width: 8 },
  { header: "Total Comm %", width: 8 },
  { header: "IRDA Amt-OD", width: 8 },
  { header: "IRDA Amt-TP", width: 8 },
  { header: "Total IRDA", width: 8 },
  { header: "Addtnl Comm %", width: 8 },
  { header: "Final Addtnl Comm", width: 8 },
  { header: "Total Comm", width: 8 },
  {
    header: "Cycle",
    width: 12,
    style: {
      alignment: {
        wrapText: true,
      },
    },
  },
];
