const db = require('../config/db');
 
 
const UserModel = {
 
    async users() {
        const [rows] = await db.query(`
        SELECT
            ID_USUARIO   AS id,
            NOME_USUARIO AS nome,
            EMAIL        AS email,
            SENHA_USUARIO AS senha,
            TIPO         AS tipo,
            TEL_USUARIO  AS telefone,
            CPF_USUARIO  AS cpf,
            STATUS       AS status,
            IMAGEM       AS imagem
        FROM USUARIO
    `);
        return rows;
    },
 
    async cadastrar(newUser) {
        const { nome, email, senha, tipo, genero } = newUser;
 
        let imagem;
        if (genero === 'feminino') {
            imagem = 'assets/imagem/icons/avatar.avif';
        } else if (genero === 'masculino') {
            imagem = 'assets/imagem/icons/avatarHomen.png';
        } else {
            imagem = 'assets/imagem/icons/avatarneutro.webp'; // padrão
        }
 
        const [result] = await db.query(
            `INSERT INTO USUARIO (NOME_USUARIO, EMAIL, SENHA_USUARIO, TIPO, GENERO_USUARIO, IMAGEM)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, senha, tipo || 'comum', genero || null, imagem    ]
        );
        return result.insertId;
    },
 
    async pesquisar(email) {
        const [rows] = await db.query(
            'SELECT * FROM USUARIO WHERE EMAIL = ?',
            [email.toLowerCase().trim()]
        );
        return rows[0] || null;
    },
 
    async pesquisarPorId(id) {
        const [rows] = await db.query(
            `SELECT
            ID_USUARIO      AS id,
            NOME_USUARIO    AS nome,
            EMAIL           AS email,
            TIPO            AS tipo,
            TEL_USUARIO     AS telefone,
            CPF_USUARIO     AS cpf,
            STATUS          AS status,
            IMAGEM          AS imagem
        FROM USUARIO WHERE ID_USUARIO = ?`, [id]
        );
        return rows[0] || null;
    },
 
    async atualizar(id, dadosAtualizados) {
        const user = await this.pesquisarPorId(id);
        if (!user) return null;
 
        const nome = dadosAtualizados.nome || user.NOME_USUARIO;
        const email = dadosAtualizados.email || user.EMAIL;
        const tel = dadosAtualizados.tel || user.TEL_USUARIO;
        const cpf = dadosAtualizados.cpf || user.CPF_USUARIO;
        const tipo = dadosAtualizados.tipo || user.TIPO;
 
        await db.query(
            `UPDATE USUARIO SET NOME_USUARIO=?, EMAIL=?, TEL_USUARIO=?, CPF_USUARIO=?, TIPO=?
             WHERE ID_USUARIO=?`,
            [nome, email, tel || null, cpf || null, tipo, id]
        );
        return this.pesquisarPorId(id);
    },
 
    async atualizarEndereco(id, endereco) {
        await db.query(
            'UPDATE USUARIO SET TEL_USUARIO = ? WHERE ID_USUARIO = ?',
            [endereco.telefone, id]
        );
    },
 
 
 
 
}
 
 
module.exports = UserModel;
 