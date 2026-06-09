const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No se recibió ninguna imagen",
      });
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64",
    )}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "e-market",
    });

    res.json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al subir imagen",
    });
  }
});

module.exports = router;
