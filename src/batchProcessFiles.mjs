import { getMultipleInputFiles } from "./getMultipleInputFiles.mjs";
import { transformBajaj } from "./transformBajaj.mjs";
import { transformGoDigit } from "./transformGoDigit.mjs";

export const batchProcessFiles = async () => {
  const filesToProcess = await getMultipleInputFiles();

  if (!filesToProcess || filesToProcess.length === 0) {
    console.log("No files found to process or an error occurred.");
    return;
  }

  console.log(`Found ${filesToProcess.length} files to process.`);

  // 5. Start the FOR loop for all items in the result array
  for (const fileInfo of filesToProcess) {
    const lowerCaseName = fileInfo.fileName.toLowerCase();

    // 6. Use a SWITCH statement with true for conditional execution
    switch (true) {
      case lowerCaseName.includes("bajaj"): {
        console.log("Transforming -", lowerCaseName);

        await transformBajaj(fileInfo);
        break;
      }

      case lowerCaseName.includes("godigit"): {
        console.log("Transforming -", lowerCaseName);

        await transformGoDigit(fileInfo);
        break;
      }

      default: {
        console.log(
          `\nSkipping file ${fileInfo.fileName}: No matching handler found.`
        );
        break;
      }
    }
  }

  console.log("\nFile processing complete.");
};

batchProcessFiles();
