
const db = require('../config/db');
const BannerModel = {

    async listar() {
        const [rows] = await db.query('SELECT COD_BANNER as id, TITULO as titulo, IMAGEM as imagem, ATIVO as status FROM BANNER');
        return rows;
    },
    async listarAtivos() {
        const [rows] = await db.query('SELECT COD_BANNER as id, TITULO as titulo, IMAGEM as imagem FROM BANNER WHERE ATIVO = 1');
        return rows;
    },

    async cadastrarbanner(newBanner) {
        const { titulo, imagem } = newBanner;
        const [result] = await db.query(
            `INSERT INTO BANNER (TITULO, IMAGEM, ATIVO) VALUES (?, ?, ?)`,
            [titulo, imagem, 1]
        );
        return result.insertId;
    },

    // async buscar(categoria, campo) {
    //     if (campo === 'categoria') {
    //         const [rows] = await db.query(
    //             'SELECT * FROM BANNER WHERE CATEGORIA = ?', [categoria]
    //         );
    //         return rows;
    //     }
    //     const [rows] = await db.query('SELECT * FROM BANNER');
    //     return rows;
    // },

    async atualizar(id, dadosAtualizados) {
        const { titulo, imagem } = dadosAtualizados;
        await db.query(
            `UPDATE BANNER SET TITULO=?, IMAGEM=? WHERE COD_BANNER=?`,
            [titulo, imagem, id]
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