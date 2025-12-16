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
  worksheet.eachRow((row, _rowNumber) => {
    // Iterate over all cells in the current row.

    row.eachCell((cell, _colNumber) => {
      cell.border = thinBlackBorder;
    });
  });
}
