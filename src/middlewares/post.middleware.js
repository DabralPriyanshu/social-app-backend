const multer = require("multer");
const path = require("node:path");
const Errors = require("../utils/errors/index");

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

const checkFileFilter = (req, file, cb) => {
  if (!file) {
    cb(null, true);
  } else if (file.mimetype && file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Errors.BadRequestError("Please upload image only"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

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
