const HIGHLIGHT_FILL = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "D9D9D9" }, // Yellow
};

/**
 * Checks if a cell's value contains the letter 'E' (case-insensitive).
 * @param {any} cellValue - The value to check.
 * @returns {boolean} True if 'E' is found, false otherwise.
 */
const hasLetterE = (cellValue) => {
  return String(cellValue || "")
    .toUpperCase()
    .includes("E");
};

/**
 * Applies a highlight fill to cells in a specific column of an ExcelJS worksheet
 * if their string value contains the letter 'E'.
 *
 * @param {object} worksheet - The ExcelJS Worksheet object to modify.
 * @param {string} columnIndex
 */
export const markGrayCells = (worksheet, columnIndex) => {
  console.log("Marking Gray Cells");

  const targetColumn = worksheet.getColumn(columnIndex);

  targetColumn.eachCell({ includeEmpty: false }, (cell) => {
    if (cell.value && hasLetterE(cell.value)) {
      cell.fill = HIGHLIGHT_FILL;
    }
  });
};
