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
            res.render('clientes', {
                clientes
            });

        } catch (error) {
            console.log('Erro' + error)
        }
    },

    async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if (!nome >= 10 && !nome.includes(" ")) return console.log("Nome inválido");

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) return console.log("Email Inválido")

            const caseOk = /[A-Z]/.test(senha) && /[a-z]/.test(senha)
            const numberOk = /\d/.test(senha)
            const specialOk = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha)
            if (!senha >= 8 && !caseOk && !numberOk && !specialOk) return console.log("Senha Inválida")

            const senhaHash = await bcrypt.hash(senha, 10);

            const newUser = {
                id: UserModel.users().reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1,
                nome,
                email,
                senha: senhaHash,
                tipo: "comum"
            }
            await UserModel.cadastrar(newUser);
            // Autentica o usuário automaticamente após o cadastro
            const token = jwt.sign(
                { id: newUser.id, nome: newUser.nome, tipo: newUser.tipo },
                SECRET,
                { expiresIn: '1d' }
            );

            res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });

            // Envia os dados de sucesso para o frontend tratar o redirecionamento
            return res.json({
                sucesso: true,
                mensagem: "Cadastro realizado com sucesso! Bem-vindo(a)!",
                nome: newUser.nome,
                redirectUrl: '/'
            });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Erro ao cadastrar usuário');
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

            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json('Senha incorreta');
            }


            const token = jwt.sign(
                { id: user.id, nome: user.nome, tipo: user.tipo },
                SECRET,
                { expiresIn: '1d' } // Expira em 1 dia
            );

            res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });


            let urlDestino = '/';
            if (user.tipo === 'admin') {
                urlDestino = '/for_adm';
            }

            return res.json({
                sucesso: true,
                nome: user.nome,
                tipo: user.tipo,
                redirectUrl: urlDestino
            });


        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).send('Erro ao fazer login');
        }
    },

    renderConta(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.redirect('/login');

            const decoded = jwt.verify(token, SECRET);
            const user = UserModel.pesquisarPorId(decoded.id);
            if (!user) return res.redirect('/login');

            res.render('conta', {
                titulo: 'Minha Conta',
                baseUrl: req.app.locals.baseUrl,
                usuario: user,
                user: user
                
            });
        } catch (error) {
            console.error('Erro ao renderizar conta:', erro);
            res.redirect('/login');
        }
    },

    async atualizarConta(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.status(401).json({ sucesso: false, mensagem: 'Não autenticado' });
            const decoded = jwt.verify(token, SECRET);

            const { nome, sobrenome, cpf, genero, dataNascimento, telefone, newsletter } = req.body;

            const dadosAtualizados = {
                nome,
                sobrenome: sobrenome || '',
                cpf: cpf || '',
                genero: genero || '',
                dataNascimento: dataNascimento || '',
                telefone: telefone || '',
                // newsletter: newsletter === 'true' || newsletter === true
            };

            const userAtualizado = UserModel.atualizar(decoded.id, dadosAtualizados);
            if (!userAtualizado) return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' });

            return res.json({ sucesso: true, mensagem: 'Dados atualizados com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar conta:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
        }
    },


    renderEndereco(req, res) {
        try {
            const token = req.cookies?.token;
            if (!token) return res.redirect('/login');

            const decoded = jwt.verify(token, SECRET);
            const user = UserModel.pesquisarPorId(decoded.id);
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

            const decoded = jwt.verify(token, 'ChaveSecreta');
            const { telefone, ...endereco } = req.body; 

            const userAtualizado = UserModel.atualizar(decoded.id, { telefone, endereco });

            if (!userAtualizado) return res.status(404).json({ sucesso: false, mensagem: 'Usuário não encontrado' });
            return res.json({ sucesso: true, mensagem: 'Endereço atualizado com sucesso!' });

        } catch (err) {
            console.error('Erro ao atualizar endereço:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor.' });
        }
    },

   
}


module.exports = UserController;

