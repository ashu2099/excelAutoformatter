// 1. HARDCODED MAPPING:
// Key: The desired column name in the OUTPUT file.
// Value: The EXACT column name found in the INPUT file (from INPUT_COLUMNS).
// If the input column name changes in the future, only the Value needs updating here.

const _MonthFrag = "Sep25";

export const GODIGIT_COLUMN_MAPPING = {
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
  "IRDA AMT": `IRDA_AMT`,
  "REWARD AMT": `REWARD_AMT`,
  "TOTAL AMT": `TOTAL_AMT`,
};

// 2. OUTPUT COLUMN DEFINITION (Defines order and properties)
export const GODIGIT_COLUMNS_SPEC = [
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
    header: "Policy Num",
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
    header: "Issue Dt",
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
  { header: "OD Prem", width: 8 },
  { header: "TP Prem", width: 8 },
  { header: "Net Prem", width: 8 },
  { header: "IRDA AMT", width: 8 },
  { header: "REWARD AMT", width: 8 },
  { header: "TOTAL AMT", width: 8 },
];
