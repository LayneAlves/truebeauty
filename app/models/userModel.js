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

    atualizarEndereco(id, endereco) {
        const users = this.users();
        const index = users.findIndex(u => u.id === id);

        if (index !== -1) {
            // Atualiza só os campos de endereço, sem sobrescrever nome/senha/etc
            users[index] = {
                ...users[index],
                telefone: endereco.telefone,
                endereco: {
                    cep: endereco.cep,
                    rua: endereco.endereco,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    estado: endereco.estado
                }
            };
            this.salvar(users);
        }
    },
}

module.exports = UserModel;