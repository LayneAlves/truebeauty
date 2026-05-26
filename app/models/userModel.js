// const db = require('../../config/db');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

const UserModel = {
    salvar(dados) {
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf8');
    },

    users() {
        const data = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(data);
        return users;
    },

    cadastrar(newUser) {
        const users = this.users();

        const usuarioComTipo = {
            ...newUser,
            tipo: newUser.tipo || "comum"
        };

        users.push(usuarioComTipo);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
    },
    pesquisar(email) {
        const users = this.users();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase().trim());

    },
    atualizar(id, dadosAtualizados) {
        const users = this.users();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...dadosAtualizados };
        this.salvar(users);
        return users[index];
    },
    pesquisarPorId(id) {
    const users = this.users();
    return users.find(user => user.id === id) || null;
    },

 
}

module.exports = UserModel;