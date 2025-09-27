import fs from "fs/promises";

const inputDir = "./input";
const outputDir = "./output";

export async function getFileNameAndPaths() {
  try {
    // 1. Read the contents of the directory
    const items = await fs.readdir(inputDir);

    return {
      inputPath: `${inputDir}/${items[0]}`,
      outputPath: `${outputDir}/autoFormatted-${items[0]}`,
    };
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Error: Folder not found at ${inputDir}`);
    } else {
      console.error("An error occurred:", err);
    }
    return null;
  }
}
