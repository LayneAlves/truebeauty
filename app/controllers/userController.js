const UserModel = require('../models/userModel');

const UserController = {
    async cadastrar(req, res){
        try {
            //Recebe os dados do formulario
            const{ nome, email, senha } = req.body;
            const newUser = {
                id: UserModel.users().reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1,
                nome,
                email,
                senha
            }
        //await, espere até ele funcionar  
        await UserModel.cadastrar(newUser);
        return res.redirect ('/');
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
    }
}

module.exports = UserController;

