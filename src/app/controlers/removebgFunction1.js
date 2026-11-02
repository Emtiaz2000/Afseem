import axios from 'axios';
import { spawn } from 'child_process';
import fs from "fs"
import sharp from 'sharp';
import { join,dirname,extname,resolve as resolvePath } from 'path';

// Finds the right python automatically (Windows venv, Linux venv, or system python)
// Optional .env: PYTHON_BIN=C:\path\to\python.exe   BGREMOVE_TIMEOUT_MS=90000
const SCRIPT_PATH = resolvePath(process.cwd(), 'src/app/pybgremove/bgremove.py');
const TIMEOUT_MS = Number(process.env.BGREMOVE_TIMEOUT_MS || 90000);

function findPython() {
  if (process.env.PYTHON_BIN) return process.env.PYTHON_BIN;
  const venvPython = process.platform === 'win32'
    ? resolvePath(process.cwd(), 'venv/Scripts/python.exe')
    : resolvePath(process.cwd(), 'venv/bin/python');
  if (fs.existsSync(venvPython)) return venvPython;
  return process.platform === 'win32' ? 'python' : 'python3';
}

// If background removal is not possible, save the normal picture as PNG
async function savePlainPicture(inputPath, outputPath) {
  await sharp(inputPath).rotate().png().toFile(outputPath);
}

function runRemover(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    let done = false;
    let out = '';
    let err = '';
    let timer;
    const finish = (fn, value) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      fn(value);
    };
    let py;
    try {
      py = spawn(findPython(), [SCRIPT_PATH, inputPath, outputPath]);
    } catch (e) {
      return reject(e);
    }
    timer = setTimeout(() => {
      py.kill('SIGKILL');
      finish(reject, new Error('Background removal took too long'));
    }, TIMEOUT_MS);

    py.stdout.on('data', (d) => { out += d.toString(); });
    py.stderr.on('data', (d) => { err += d.toString(); });
    // this line stops the crash when python is missing
    py.on('error', (e) => finish(reject, e));
    py.on('close', (code) => {
      if (code === 0 && !out.includes('ERROR:') && fs.existsSync(outputPath)) {
        finish(resolve, outputPath);
      } else {
        finish(reject, new Error(`Background removal failed (code ${code}). ${out.trim()} ${err.slice(-300)}`.trim()));
      }
    });
  });
}

// Used by add product / edit product
export const runPython = async (inputPath, outputPath) => {
  try {
    await runRemover(inputPath, outputPath);
  } catch (e) {
    console.error('Background removal skipped, saving normal picture:', e.message);
    await savePlainPicture(inputPath, outputPath);
  }
  return outputPath;
};

// Used by Excel bulk upload
export async function removeBackground(inputPath, outputPath) {
  await runPython(inputPath, outputPath);
}

export function getDriveFileId(url) {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

// Download image from URL
export async function downloadImage(url, outputPath) {
  try {
    if (!url) return null;
    if (typeof url === "object") {
      url = url.hyperlink || url.text || "";
    }
    if (typeof url !== "string" || !url.trim()) return null;

    const driveMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      const fileId = driveMatch[1];
      url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    const response = await axios({ url, method: "GET", responseType: "stream", headers: {
        "User-Agent": "Mozilla/5.0",
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