const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const currentDate = Date.now() ;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${currentDate}${fileExtension}`);
  },
});

const upload = multer({ storage });

module.exports.upload = upload;