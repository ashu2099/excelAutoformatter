/**
 * Adds a row to an exceljs worksheet containing the SUM formula for specified columns.
 * Assumes column headers are in Row 1 and data starts in Row 2.
 *
 * @param {object} worksheet - The exceljs Worksheet object.
 * @param {string[]} sumColumnNames - An array of column header names (keys) to sum.
 * @param {string} [totalLabel='Total'] - The label for the summary row (placed in the first column).
 */
export function addSummationRow(
  worksheet,
  sumColumnNames,
  totalLabel = "Total"
) {
  // 1. Get the last row of data. Assumes row 1 is the header.
  const lastDataRowNumber = worksheet.lastRow ? worksheet.lastRow.number : 1;
  // The summary row will be immediately after the last data row.
  const summaryRowNumber = lastDataRowNumber + 1;

  // Check if there's actual data (i.e., lastRowNumber > 1)
  if (lastDataRowNumber < 2) {
    console.warn(
      "No data rows found to sum (excluding header). Summation row skipped."
    );
    return;
  }

  // 2. Add the label for the total row in the first column (A)
  const summaryRow = worksheet.getRow(summaryRowNumber);
  summaryRow.getCell(2).value = totalLabel;

  // 3. Iterate through the specified column names and apply the SUM formula
  sumColumnNames.forEach((headerName) => {
    // Find the column definition by its header (case-sensitive)
    const column = worksheet.columns.find((col) => col.header === headerName);

    if (!column) {
      console.error(
        `Column with header "${headerName}" not found in worksheet definition.`
      );
      return;
    }

    // Get the column letter (e.g., 'H') and column index (e.g., 8)
    const colLetter = column.letter;
    const colIndex = column.number;

    // Define the range for the SUM formula. Data starts from Row 2.
    const range = `${colLetter}2:${colLetter}${lastDataRowNumber}`;
    // const cellAddress = `${colLetter}${summaryRowNumber}`;

    // Apply the formula to the summary cell
    const cell = summaryRow.getCell(colIndex);
    cell.value = {
      formula: `SUM(${range})`,
      // It's highly recommended to provide a result property in production
      // for faster loading in some Excel viewers. For simplicity here, we omit
      // the actual value calculation.
    };
  });
}
