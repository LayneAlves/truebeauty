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

        users.push(newUser);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');

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
}

module.exports = UserModel;