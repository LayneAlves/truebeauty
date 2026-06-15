const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

const UserModel = {

    users() {
        if (!fs.existsSync(filePath)) return [];
        const data = fs.readFileSync(filePath, 'utf8');
        return data ? JSON.parse(data) : [];
    },

    salvar(dados) {
        fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf8');
    },

    pesquisar(email) {
        const users = this.users();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
    },

    pesquisarPorId(id) {
        const users = this.users();
        return users.find(u => u.id === id) || null;
    },

   

    cadastrar(newUser) {
        const users = this.users();
        users.push({ ...newUser, tipo: newUser.tipo || 'comum' });
        this.salvar(users);
    },



    atualizar(id, dadosAtualizados) {
        const users = this.users();
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...dadosAtualizados };
        this.salvar(users);
        return users[index];
    },
};

module.exports = UserModel;