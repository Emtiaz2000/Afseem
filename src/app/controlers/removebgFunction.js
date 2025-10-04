import axios from 'axios';
import { spawn } from 'child_process';
import fs from "fs"
import { join,dirname,extname } from 'path';
// Helper: run Python background removal
export const runPython = (inputPath, outputPath)=>{
  return new Promise((resolve, reject) => {
    //const pythonProcess = spawn("./venv/bin/python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);
    const pythonProcess = spawn("python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);

    pythonProcess.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) reject(new Error(`Python exited with code ${code}`));
    });
  });
}



//bulk background remove
export  function  removeBackground(inputPath, outputPath){
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);
    //const py= spawn("./venv/bin/python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);

    py.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });
    py.on("close", (code) => (code === 0 ? resolve() : reject(new Error("Background removal failed"))));
  });
}

export function getDriveFileId(url) {
  const match = url.match(/[-\w]{25,}/); // Google Drive IDs are ~25+ characters long
  return match ? match[0] : null;
}

//download image from url
// Download image from URL
export async function downloadImage(url, outputPath) {
  try {
    if (!url) return null;

    // If ExcelJS gives an object, normalize it
    if (typeof url === "object") {
      url = url.hyperlink || url.text || "";
    }
    if (typeof url !== "string" || !url.trim()) return null;

    //console.log("Before match:", url);

    // Google Drive direct download
    const driveMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      const fileId = driveMatch[1]; // <-- capture group
      url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      //console.log("Converted Drive URL:", url);
    }

    const response = await axios({ url, method: "GET", responseType: "stream",headers: {
        "User-Agent": "Mozilla/5.0", // <-- helps avoid 403 on some hosts
      } });
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error("Failed to download image:", err.message);
    return null;
  }

}