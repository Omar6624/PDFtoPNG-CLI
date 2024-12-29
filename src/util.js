import fs from "fs";
import path from "node:path";
// import { PDFDocument, rgb } from "pdf-lib";
// import { createCanvas } from "canvas";
import { pdfToPng } from "pdf-to-png-converter";

export const validatePath = async (PATH) => {
  try {
    const stats = fs.statSync(PATH);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Path does not exist!`);
    } else if (error.code === "EACCES") {
      console.error("Permission denied");
    } else {
      console.error("Error validating path");
    }
    return false;
  }
};

export const createOutputDir = async (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    for (let file of files) {
      if (path.extname(file).toLocaleLowerCase() === ".pdf") {
        const pdfPath = path.join(dirPath, file);
        const outputDirName = path.basename(pdfPath, ".pdf");
        const outputDirPath = path.join(dirPath, outputDirName);

        // console.log(outputDir);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath);
          console.log("Directory created!");
        } else {
          console.log("Directory exists!");
        }
        // console.log(pdfPath);
        const pngPages = await pdfToPng(pdfPath, {
          viewportScale: 2.0,
          outputFolder: outputDirPath,
          outputFileMaskFunc: (pageNum) => `page_${pageNum}.png`,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// const changePdftoPng = async (pdfPath, outDir) => {
//   try {
//     //load pdf
//     const pdfbyte = fs.readFileSync(pdfPath);
//     const pdfDoc = await PDFDocument.load(pdfbyte);
//     const pageCount = pdfDoc.getPageCount(pdfDoc);

//     for (let i = 0; i < pageCount; i++) {
//       const page = pdfDoc.getPage(i);
//       const { width, height } = page.getSize();

//       const canvas = createCanvas(width, height);
//       const context = canvas.getContext("2d");
//       page.drawText("", {
//         x: 0,
//         y: 0,
//         width,
//         height,
//         color: rgb(0, 0, 0),
//       });

//       const pngBuffer = canvas.toBuffer("image/png");

//       const outPath = path.join(outDir, `page${i + 1}.png`);
//       fs.writeFileSync(outPath, pngBuffer);
//       console.log(`Converted page ${i}`);
//     }
//     console.log("Finished current pdf");
//   } catch (error) {
//     console.error("Error converting PDF to PNG", error);
//   }
// };
