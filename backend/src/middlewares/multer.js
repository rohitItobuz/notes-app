import path from "path";
import multer from "multer";

const profileImageExtension = ["image/png", "image/jpeg", "image/webp"];
const noteAttachmentExtension = [
  ...profileImageExtension,
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "text/plain",
  "application/vnd.ms-excel",
  "	application/msword",
];

const createSotrage = (folder) => {
  return multer.diskStorage({
    destination: `./uploads/${folder}`,
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const originalName = path.basename(file.originalname, ext);
      cb(null, `${originalName}` + "-" + Date.now() + `${ext}`);
    },
  });
};

const fileValidation = (allowedTypes) => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only PNG and JPEG is allowed!"), false);
    }
  };
};

export const profileUpload = multer({
  storage:createSotrage('user'),
  fileFilter: fileValidation(profileImageExtension),
});

export const noteAttachment = multer({
  storage:createSotrage('note'),
  fileFilter: fileValidation(noteAttachmentExtension),
});
