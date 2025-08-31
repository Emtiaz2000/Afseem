import multer from "multer";

// store in memory (buffer, not saved to disk)
const storage = multer.memoryStorage();

// file filter for validation
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp/;
  if (allowedTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, png, webp)"), false);
  }
}

export const upload = multer({ storage, fileFilter });
 
export const uploadcsv = multer({ dest: 'uploads/' });

