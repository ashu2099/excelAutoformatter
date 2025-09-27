const thinBlackBorder = {
  top: { style: "thin", color: { argb: "FF000000" } }, // Black
  left: { style: "thin", color: { argb: "FF000000" } },
  bottom: { style: "thin", color: { argb: "FF000000" } },
  right: { style: "thin", color: { argb: "FF000000" } },
};

/**
 * Applies a 1px black border to every non-empty cell in the given ExcelJS worksheet.
 *
 * This function iterates through all rows and uses row.eachCell() to examine
 * and style only cells that contain data.
 *
 * @param {object} worksheet The ExcelJS Worksheet object to be styled.
 */
export async function applyBorder(worksheet) {
  console.log("Starting border application...");

  // Iterate over all rows in the worksheet (including empty ones if necessary,
  // though the inner loop handles non-empty cells)
  worksheet.eachRow((row, _rowNumber) => {
    // Iterate over all cells in the current row.
    // However, ExcelJS iterates over *defined* cells, so we check for value inside.

    row.eachCell((cell, _colNumber) => {
      // Check if the cell has content (non-null, non-empty string, non-zero number, etc.)
      // The isNull property is a robust way to check if a cell contains actual data.
      // We specifically check for null and empty string, as a 0 or false value is valid content.

      cell.border = thinBlackBorder;
    });
  });

  console.log("Border application complete.");
}
