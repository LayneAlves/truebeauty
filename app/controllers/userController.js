const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');

exports.renderCadastro = (req, res) => {
    res.render('cadastro', {
        titulo: 'Cadastro de Usuário',
        baseUrl: req.app.locals.baseUrl
    });
};

exports.salvarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Ler usuários existentes
        let users = [];
        try {
            const data = await fs.readFile(usersFilePath, 'utf8');
            users = JSON.parse(data);
        } catch (err) {
            // Arquivo não existe ou vazio, users permanece []
        }

        // Verificar se email já existe
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.render('cadastro', {
                titulo: 'Cadastro de Usuário',
                baseUrl: req.app.locals.baseUrl,
                erro: 'Email já cadastrado.'
            });
        }

        // Adicionar novo usuário
        const newUser = {
            id: users.length + 1,
            nome,
            email,
            senha // Nota: senha em plain text, considere criptografar em produção
        };
        users.push(newUser);

        // Escrever de volta no arquivo
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

        // Redirecionar ou renderizar sucesso
        res.render('cadastro', {
            titulo: 'Cadastro de Usuário',
            baseUrl: req.app.locals.baseUrl,
            sucesso: 'Usuário cadastrado com sucesso!'
        });
    } catch (error) {
        console.error(error);
        res.render('cadastro', {
            titulo: 'Cadastro de Usuário',
            baseUrl: req.app.locals.baseUrl,
            erro: 'Erro ao cadastrar usuário.'
        });
    }
};