const multer = require("multer");
const path = require("path");
const sharp = require('sharp');
const fs = require("fs");

const storage = multer.memoryStorage();

const dirs = {
    produtos: path.join(__dirname, "../public/assets/imagem/produtos"),
    banners: path.join(__dirname, "../public/assets/imagem/banners")
    
};

const imageUpload = multer({ storage });
const processImage = async (file, folder) => {
    const fileName = `${Date.now()}-${path.parse(file.originalname).name}.webp`;
    const outputPath = path.join(dirs[folder], fileName);

    await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath);

    return fileName;
};

module.exports = { 
    imageUpload,
    processImage
};