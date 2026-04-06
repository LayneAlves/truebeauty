const multer = require('multer');
const path = require('path');

const sharp = require('sharp');
const fs = require('fs');
const storage = multer.memoryStorage();

const directory = path.join(__dirname, '../public/assets/imagem/produtos');
const imagemUpload = multer({ storage });

const processarImagem = async (req, res, next) => {
    if (!req.file) return next(); // evita erro se não tiver imagem

    const nome = `${Date.now()}-${path.parse(req.file.originalname).name}.webp`;
    const outputPath = path.join(directory, nome);

    await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath);

    req.file.filename = nome; // guarda o nome pra usar depois

    next();
}
module.exports = {
    imagemUpload,
    processarImagem
}