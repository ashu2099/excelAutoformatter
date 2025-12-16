const LIGHT_GRAY_FILL = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFD9D9D9" },
};

/**
 * Defines the column structure, moves the headers to a specified row,
 * and adds the data, ensuring top rows are left empty for other use.
 *
 * @param {object} worksheet - The ExcelJS Worksheet object to modify.
 * @param {Array<object>} columnDefs - Array of column objects (header, key, width).
 * @param {Array<object>} dataRows - Array of data objects keyed by column key.
 * @param {number} headerRowIndex - The 1-based index (e.g., 4) where the headers should start.
 */
export const setupColumnsWithOffset = (
  worksheet,
  columnDefs,
  headerRowIndex
) => {
  if (headerRowIndex < 1) {
    throw new Error("Header row index must be 1 or greater.");
  }

  // This sets up column keys and widths, and automatically writes headers to Row 1.
  worksheet.columns = columnDefs;

  // Clear the original headers from Row 1.
  const originalHeaderRow = worksheet.getRow(1);
  if (originalHeaderRow) {
    originalHeaderRow.values = [];
  }

  // Get the header values.
  const headerValues = columnDefs.map((col) => col.header);

  // Get a reference to the desired header row.
  const newHeaderRow = worksheet.getRow(headerRowIndex);

  // Assign the header values.
  newHeaderRow.values = [...headerValues];
  newHeaderRow.font = { bold: true };

  newHeaderRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    cell.fill = LIGHT_GRAY_FILL;

    if (columnDefs[colNumber]?.style?.alignment) {
      cell.style.alignment = columnDefs[colNumber].style.alignment;
    }
  });
};
