const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'ChaveSecreta';
const crypto = require('crypto');
const transporter = require('../config/email');


const UserController = {
    async users(req, res) {
        try {
            const clientes = await UserModel.users();
            res.render('clientes', { clientes });
        } catch (error) {
            console.log('Erro' + error);
        }
    },

    async cadastrar(req, res) {
        try {
            const { nome, email, senha, genero } = req.body;  // ← adiciona genero

            if (!nome >= 10 && !nome.includes(" ")) return console.log("Nome inválido");

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) return console.log("Email Inválido");

            const caseOk = /[A-Z]/.test(senha) && /[a-z]/.test(senha);
            const numberOk = /\d/.test(senha);
            const specialOk = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha);
            if (!senha >= 8 && !caseOk && !numberOk && !specialOk) return console.log("Senha Inválida");

            const senhaHash = await bcrypt.hash(senha, 10);

            const newUser = {
                nome,
                email,
                senha: senhaHash,
                tipo: "comum",
                genero  // ← passa o gênero para o model
            };

            const novoId = await UserModel.cadastrar(newUser);

            const token = jwt.sign(
                { id: novoId, nome: newUser.nome, tipo: newUser.tipo },
                SECRET,
                { expiresIn: '1d' }
            );

            res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

            return res.json({
                sucesso: true,
                mensagem: "Cadastro realizado com sucesso! Bem-vindo(a)!",
                nome: newUser.nome,
                redirectUrl: '/'
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar usuário' });
        }
    },

    renderCadastro(req, res) {
        res.render('cadastro', {
            titulo: 'Cadastro de Usuário',
            baseUrl: req.app.locals.baseUrl
        });
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = UserModel.pesquisar(email);

            if (!user) {
                return res.status(401).json('Email não encontrado');
            }

            // ← nome da coluna atualizado para o banco
            const senhaValida = await bcrypt.compare(senha, user.SENHA_USUARIO);
            if (!senhaValida) {
                return res.status(401).json('Senha incorreta');
            }

            const token = jwt.sign(
                { id: user.ID_USUARIO, nome: user.NOME_USUARIO, tipo: user.TIPO },
                SECRET,
                { expiresIn: '1d' }
            );

            res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

            let urlDestino = '/';
            if (user.TIPO === 'admin') {
                urlDestino = '/for_adm';
            }

            return res.json({
                sucesso: true,
                nome: user.NOME_USUARIO,
                tipo: user.TIPO,
                redirectUrl: urlDestino
            });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).send('Erro ao fazer login');
        }
    },

    async renderConta(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.redirect('/login');

            const decoded = jwt.verify(token, SECRET);
            const user = await UserModel.pesquisarPorId(decoded.id);
            if (!user) return res.redirect('/login');

            res.render('conta', {
                titulo: 'Minha Conta',
                baseUrl: req.app.locals.baseUrl,
                usuario: user,
                user: user
            });
        } catch (error) {
            console.error('Erro ao renderizar conta:', error);
            res.redirect('/login');
        }
    },

    async atualizarConta(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.status(401).json({ sucesso: false, mensagem: 'Não autenticado' });
            const decoded = jwt.verify(token, SECRET);

            const { nome, sobrenome, cpf, genero, dataNascimento, telefone } = req.body;

            const dadosAtualizados = {
                nome,
                sobrenome: sobrenome || '',
                cpf: cpf || '',
                genero: genero || '',
                dataNascimento: dataNascimento || '',
                tel: telefone || ''
            };

            const userAtualizado = await UserModel.atualizar(decoded.id, dadosAtualizados);
            if (!userAtualizado) return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' });

            return res.json({ sucesso: true, mensagem: 'Dados atualizados com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar conta:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
        }
    },

    async renderEndereco(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.redirect('/login');

            const decoded = jwt.verify(token, SECRET);
            const user = await UserModel.pesquisarPorId(decoded.id);
            if (!user) return res.redirect('/login');

            res.render('endereco', {
                titulo: 'Meus Endereços',
                baseUrl: req.app.locals.baseUrl,
                usuario: user,
                user: user
            });
        } catch (error) {
            console.error('Erro ao renderizar endereço:', error);
            res.redirect('/login');
        }
    },

    async atualizarEndereco(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.status(401).json({ sucesso: false, mensagem: 'Não autenticado' });

            const decoded = jwt.verify(token, SECRET);
            const { telefone, ...endereco } = req.body;

            const userAtualizado = await UserModel.atualizar(decoded.id, { tel: telefone, ...endereco });
            if (!userAtualizado) return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' });

            return res.json({ sucesso: true, mensagem: 'Endereço atualizado com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar endereço:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor.' });
        }
    },

   
}


module.exports = UserController;

