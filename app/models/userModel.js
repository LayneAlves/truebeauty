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
    
    pesquisarPorId(id) {
    const users = this.users();
    return users.find(user => user.id === id) || null;
    },

    // Salva o token e sua expiração no registro do usuário
    salvarTokenRecuperacao(email, token, expiracao) {
        const users = this.users();
        const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase().trim());
        if (index !== -1) return null; 

        users[index].resetToken = token;
        users[index].resetTokenExpiracao = expiracao;
        this.salvar(users);
        return users[index];

    },
    // Busca um usuário pelo token de recuperação
    pesquisarPorToken(token) {
        const users = this.users();
        return users.find(u => u.resetToken === token) || null;
    },
 
    // Atualiza a senha e limpa o token após a redefinição
    redefinirSenha(token, novaSenhaHash) {
        const users = this.users();
        const index = users.findIndex(u => u.resetToken === token);
        if (index === -1) return null;
 
        users[index].senha = novaSenhaHash;
        users[index].resetToken = null;
        users[index].resetTokenExpiracao = null;
        this.salvar(users);
        return users[index];
    },

    atualizar(id, dadosAtualizados) {
        const users = this.users();
        const index = users.findIndex(user => user.id === id);
        if (index === -1) return null;

        users[index] = { ...users[index], ...dadosAtualizados };
        this.salvar(users);
        return users[index];
    },
}


module.exports = UserModel;