const db = require('../config/db');
// const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '../data/users.json');

const UserModel = {
    // salvar(dados) {ca
    //     fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf8');
    // },

    // users() {
    //     const data = fs.readFileSync(filePath, 'utf8');
    //     const users = JSON.parse(data);
    //     return users;
    // },

    async users() {
        const [rows] = await db.query('SELECT * FROM USUARIO');
        return rows;
    },

    // cadastrar(newUser) {
    //     const users = this.users();

    //     const usuarioComTipo = {
    //         ...newUser,
    //         tipo: newUser.tipo || "comum"
    //     };

    //     users.push(usuarioComTipo);
    //     fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
    // },

    async cadastrar(newUser) {
        const { nome, email, senha, tipo } = newUser;
        const [result] = await db.query(
            `INSERT INTO USUARIO (NOME_USUARIO, EMAIL, SENHA_USUARIO, TIPO)
             VALUES (?, ?, ?, ?)`,
            [nome, email, senha, tipo || 'comum']
        );
        return result.insertId;
    },
    // pesquisar(email) {
    //     const users = this.users();
    //     return users.find(user => user.email.toLowerCase() === email.toLowerCase().trim());

    // },

    async pesquisar(email) {
        const [rows] = await db.query(
            'SELECT * FROM USUARIO WHERE EMAIL = ?',
            [email.toLowerCase().trim()]
        );
        return rows[0] || null;
    },
    // atualizar(id, dadosAtualizados) {
    //     const users = this.users();
    //     const index = users.findIndex(user => user.id === id);
    //     if (index === -1) return null;

    //     users[index] = { ...users[index], ...dadosAtualizados };
    //     this.salvar(users);
    //     return users[index];
    // },
    // pesquisarPorId(id) {
    //     const users = this.users();
    //     return users.find(user => user.id === id) || null;
    // },

    async pesquisarPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM USUARIO WHERE ID_USUARIO = ?', [id]
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

    salvar() { }



}


module.exports = UserModel;