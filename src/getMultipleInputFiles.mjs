import fs from "fs/promises";
import path from "path";
import { INPUT_DIR, OUTPUT_DIR } from "./constants.mjs";

export const getMultipleInputFiles = async () => {
  try {
    // 2. Read the contents of the input directory
    const items = await fs.readdir(INPUT_DIR);

    // 3. Filter out directories (optional, but safer) and hidden files
    const files = items.filter((item) => !item.startsWith(".")); // Basic filter

    // 4. Map the list of files to an array of path objects
    const result = files.map((filename) => ({
      fileName: filename,
      inputPath: path.join(INPUT_DIR, filename),
      // ExcelJS always writes XLSX content, regardless of the source format.
      outputPath: path.join(
        OUTPUT_DIR,
        `autoFormatted-${path.parse(filename).name}.xlsx`
      ),
    }));

    return result;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Error: Input folder not found at ${INPUT_DIR}`);
    } else {
      console.error("An error occurred during directory reading:", err);
    }
    return null;
  }
};
