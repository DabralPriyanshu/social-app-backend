const multer = require("multer");
const path = require("node:path");
const Errors = require("../utils/errors/index");

//this is used to create a storage where images will be store before saving to cloudinary multer is a middleware that help us to access files in request body
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

// This function checks uploaded file type
// It allows the request if no file is uploaded or if the file is an image,
// otherwise it throws an error for invalid file type

const checkFileFilter = (req, file, cb) => {
  if (!file) {
    cb(null, true);
  } else if (file.mimetype && file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Errors.BadRequestError("Please upload image only"), false);
  }
};
// Multer configuration for file upload
// Uses custom storage, allows only image files, and limits file size to 5MB
const upload = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
//this request will be use to validate create post request to check whether all the required fields are present ot not
const validateCreatePostRequest = (req, res, next) => {
  try {
    if (!req.body?.text && !req.file) {
      const err = new Errors.BadRequestError("please provide text or photo");
      return res.status(err.statusCode).json(err);
    }
    next();
  } catch (error) {
    const err = new Errors.ServerError();
    return res.status(err.statusCode).json(err);
  }
};
//this request will be use to validate comment post request to check whether all the required fields are present ot not
const validateCommentOnPostRequest = (req, res, next) => {
  try {
    if (!req.params?.id) {
      const err = new Errors.BadRequestError("Post id is not provided");
      return res.status(err.statusCode).json(err);
    }
    if (!req.body?.text) {
      const err = new Errors.BadRequestError("please provide comment for post");
      return res.status(err.statusCode).json(err);
    }
    next();
  } catch (error) {
    const err = new Errors.ServerError();
    return res.status(err.statusCode).json(err);
  }
};

module.exports = {
  upload,
  validateCreatePostRequest,
  validateCommentOnPostRequest,
};
