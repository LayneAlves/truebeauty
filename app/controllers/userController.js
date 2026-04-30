const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

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
            //Recebe os dados do formulario
            const { nome, email, senha } = req.body;
            if (!nome >= 10 && !nome.includes(" ")) return console.log("Nome inválido");

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) return console.log("Email Inválido")

            const caseOk = /[A-Z]/.test(senha) && /[a-z]/.test(senha)
            const numberOk = /\d/.test(senha)
            const specialOk = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(senha)
            if(!senha >= 8 && !caseOk && !numberOk && !specialOk) return console.log("Senha Inválida")

            const senhaHash = await bcrypt.hash(senha, 10);

            const newUser = {
                id: UserModel.users().reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1,
                nome,
                email,
                senha : senhaHash
            }
            //await, espere até ele funcionar  
            await UserModel.cadastrar(newUser);
            return res.redirect('/');
            //Retorno ao usuário
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
            const user = await UserModel.pesquisar(email);
            
            if (!user) {
                return res.status(401).json('Email não encontrado');
            } 
            
            // Compara a senha do usuário com a senha cadastrada, para fazer no login 
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json('Senha incorreta');
            }
            return res.json({ message: 'Login bem-sucedido', user, redirectUrl: '/', sucesso: true });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).send('Erro ao fazer login');
        }
    },
}


module.exports = UserController;

