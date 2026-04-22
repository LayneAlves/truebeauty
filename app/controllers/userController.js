const UserModel = require('../models/userModel');

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
            const newUser = {
                id: UserModel.users().reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1,
                nome,
                email,
                senha
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
                return res.status(401).send('Email não encontrado');
            } if (user.senha !== senha) {
                return res.status(401).send('Senha incorreta');
            }
            return res.json({ message: 'Login bem-sucedido', user, redirectUrl: '/produtos', sucesso: true });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).send('Erro ao fazer login');
        }
    },
}


module.exports = UserController;

