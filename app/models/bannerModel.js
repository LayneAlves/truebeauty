const db = require('../config/db');
const BannerModel = {

    async listar() {
        const [rows] = await db.query(`
            SELECT 
                COD_BANNER as id, 
                TITULO as titulo, 
                IMAGEM as imagem, 
                IMAGEM_TABLET as imagem_tablet,
                IMAGEM_MOBILE as imagem_mobile,
                CATEGORIA as categoria,
                ALT as alt,
                LINK as link,
                DATA_INICIO as data_inicio,
                DATA_FIM as data_fim,
                ATIVO as status 
            FROM BANNER
        `);
        return rows;
    },

    async listarAtivos() {
        const [rows] = await db.query(`
            SELECT 
                COD_BANNER as id, 
                TITULO as titulo, 
                IMAGEM as imagem,
                IMAGEM_TABLET as imagem_tablet,
                IMAGEM_MOBILE as imagem_mobile,
                CATEGORIA as categoria,
                ALT as alt,
                LINK as link,
                DATA_INICIO as data_inicio,
                DATA_FIM as data_fim
            FROM BANNER 
            WHERE ATIVO = 1
        `);
        return rows;
    },

    async cadastrarbanner(newBanner) {
        const { 
            titulo, imagem, imagem_tablet, imagem_mobile,
            categoria, alt, link, data_inicio, data_fim 
        } = newBanner;

        const [result] = await db.query(
            `INSERT INTO BANNER 
                (TITULO, IMAGEM, IMAGEM_TABLET, IMAGEM_MOBILE, CATEGORIA, ALT, LINK, DATA_INICIO, DATA_FIM, ATIVO) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                titulo, 
                imagem, 
                imagem_tablet || null, 
                imagem_mobile || null,
                categoria || null,
                alt || null,
                link || null,
                data_inicio || null,
                data_fim || null,
                1
            ]
        );
        return result.insertId;
    },

    async atualizar(id, dadosAtualizados) {
        const { 
            titulo, imagem, imagem_tablet, imagem_mobile,
            categoria, alt, link, data_inicio, data_fim 
        } = dadosAtualizados;

        await db.query(
            `UPDATE BANNER 
             SET TITULO=?, IMAGEM=?, IMAGEM_TABLET=?, IMAGEM_MOBILE=?, 
                 CATEGORIA=?, ALT=?, LINK=?, DATA_INICIO=?, DATA_FIM=? 
             WHERE COD_BANNER=?`,
            [
                titulo, imagem, imagem_tablet || null, imagem_mobile || null,
                categoria || null, alt || null, link || null, 
                data_inicio || null, data_fim || null,
                id
            ]
        );
    },

    async excluir(id) {
        await db.query('DELETE FROM BANNER WHERE COD_BANNER = ?', [id]);
    },

    async toggleStatus(id, status) {
        await db.query('UPDATE BANNER SET ATIVO = ? WHERE COD_BANNER = ?', [status, id]);
    },

}

module.exports = BannerModel;