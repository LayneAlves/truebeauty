const multer = require('multer');
const path = require('path');

const sharp = require('sharp');
const fs = require('fs');
const storage = multer.memoryStorage();

const directory = path.join(__dirname, '../public/assets/imagem/produtos');
const imagemUpload = multer({ storage });

const processarImagem = async (req, res, next) => {
    const nome = `${Date.now()}-${path.parse(req.originalname).name}.webp`;
    const outputPath = path.join(directory, nome);
    await sharp(req.buffer)
        .webp({ quality: 80 })
        .toFile(outputPath)
        return nome;
}
module.exports = {
    imagemUpload,
    processarImagem
}