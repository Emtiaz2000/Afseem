
import { spawn } from 'child_process';

// Helper: run Python background removal
export const runPython = (inputPath, outputPath)=>{
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("./venv/bin/python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);
    //const pythonProcess = spawn("python", ["./src/app/pybgremove/bgremove.py", inputPath, outputPath]);

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