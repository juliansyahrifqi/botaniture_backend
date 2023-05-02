import multer from "multer";
import path from "path";
import fs from "fs";

const uploadFile = (dirName: string) => {
  const uploadDirectory = path.join(__dirname, '../../', 'uploads/', dirName);

  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  return storage;
};

export default uploadFile;
