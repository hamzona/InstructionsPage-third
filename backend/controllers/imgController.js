require("dotenv").config();

const User = require("../models/authModel");
const multer = require("multer");
const Grid = require("gridfs-stream");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const { response } = require("express");

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  // options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/webp"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "uploadsImages",
      filename: `${Date.now()}${path.extname(file.originalname)}`,
    };
  },
});

const upload = multer({ storage }).single("img");

const saveFileName = async (req, res) => {
  if (!req.file.filename) {
    const user = await User.findById({ _id: req.user });
    return res.json(user);
  }
  try {
    let updateUser = await User.findByIdAndUpdate(
      { _id: req.user },
      { imgName: req.file.filename },
      { returnOriginal: false }
    );
    const token = { token: req.jwt };
    updateUser = { ...updateUser._doc, ...token };
    res.json(updateUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { upload, saveFileName };
