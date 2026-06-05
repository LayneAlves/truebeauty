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
            const user = await UserModel.pesquisar(email);

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

    async solicitarRecuperacao(req, res) {
        try {
            const { email } = req.body;
 
            const user = UserModel.pesquisar(email);
            if (!user) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Não encontramos uma conta com este e-mail.'
                });
            }
 
            // Gera token
            const token = crypto.randomBytes(32).toString('hex');
 
            // Expira em 1 hora
            const expiracao = Date.now() + 60 * 60 * 1000;
 
            UserModel.salvarTokenRecuperacao(email, token, expiracao);
 
            const baseUrl = req.app.locals.baseUrl || `${req.protocol}://${req.get('host')}`;
            const link = `${baseUrl}/redefinir-senha/${token}`;
 
            const htmlEmail = `
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recuperação de Senha – True Beauty</title>
                </head>
                <body style="margin:0;padding:0;background:#f9f5f2;font-family:'Georgia',serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f5f2;padding:40px 0;">
                    <tr>
                    <td align="center">
                        <table width="560" cellpadding="0" cellspacing="0"
                            style="background:#ffffff;border-radius:12px;overflow:hidden;
                                    box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                
                        <!-- Cabeçalho -->
                        <tr>
                            <td align="center"
                                style="background:#1a1a1a;padding:36px 40px 28px;">
                            <p style="margin:0;font-size:26px;font-weight:bold;
                                        color:#d4a96a;letter-spacing:3px;text-transform:uppercase;">
                                True Beauty
                            </p>
                            <p style="margin:6px 0 0;color:#888;font-size:12px;
                                        letter-spacing:1.5px;text-transform:uppercase;">
                                Beleza que transforma
                            </p>
                            </td>
                        </tr>
                
                        <!-- Corpo -->
                        <tr>
                            <td style="padding:44px 48px 36px;">
                            <p style="margin:0 0 8px;font-size:22px;color:#1a1a1a;font-weight:bold;">
                                Olá, ${user.nome} 👋
                            </p>
                            <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
                                Recebemos uma solicitação para redefinir a senha da sua conta.
                                Clique no botão abaixo para criar uma nova senha.
                                <br><strong>Este link é válido por 1 hora.</strong>
                            </p>
                
                            <!-- Botão CTA -->
                            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                                <tr>
                                <td align="center"
                                    style="background:#1a1a1a;border-radius:8px;padding:16px 40px;">
                                    <a href="${link}"
                                    style="color:#d4a96a;font-size:15px;font-weight:bold;
                                            text-decoration:none;letter-spacing:1px;
                                            text-transform:uppercase;">
                                    Redefinir minha senha
                                    </a>
                                </td>
                                </tr>
                            </table>
                
                            <p style="margin:0 0 8px;font-size:13px;color:#888;line-height:1.6;">
                                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
                            </p>
                            <p style="margin:0 0 28px;word-break:break-all;">
                                <a href="${link}" style="color:#d4a96a;font-size:13px;">${link}</a>
                            </p>
                
                            <hr style="border:none;border-top:1px solid #ece8e3;margin:0 0 24px;">
                
                            <p style="margin:0;font-size:13px;color:#aaa;line-height:1.6;">
                                Se você não solicitou a redefinição de senha, ignore este e-mail.
                                Sua senha permanece a mesma e nenhuma ação é necessária.
                            </p>
                            </td>
                        </tr>
                
                        <!-- Rodapé -->
                        <tr>
                            <td align="center"
                                style="background:#f4ede6;padding:20px 40px;
                                    font-size:12px;color:#aaa;letter-spacing:0.5px;">
                            © ${new Date().getFullYear()} True Beauty · Todos os direitos reservados
                            </td>
                        </tr>
                
                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>`;
    
            await transporter.sendMail({
                from: 'True Beauty <sactruebeauty@gmail.com>',
                to: user.email,
                subject: 'Redefinição de Senha – True Beauty',
                html: htmlEmail
            });
 
            return res.json({
                sucesso: true,
                mensagem: 'E-mail enviado! Verifique sua caixa de entrada.'
            });
        } catch (error) {
            console.error('Erro ao solicitar recuperação:', error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar e-mail. Tente novamente.' });
        }
    },
 
    /*Valida o token e renderiza a página de redefinição.*/
    renderRedefinirSenha(req, res) {
        try {
            const { token } = req.params;
            const user = UserModel.pesquisarPorToken(token);
 
            if (!user || !user.resetTokenExpiracao || Date.now() > user.resetTokenExpiracao) {
                return res.render('token-invalido', {
                    titulo: 'Link inválido ou expirado',
                    baseUrl: req.app.locals.baseUrl
                });
            }
 
            res.render('redefinir-senha', {
                titulo: 'Redefinir Senha',
                baseUrl: req.app.locals.baseUrl,
                token
            });
        } catch (error) {
            console.error('Erro ao renderizar redefinição:', error);
            res.redirect('/');
        }
    },
 
    /* Recebe nova senha + token, valida, atualiza e limpa o token.*/
    async redefinirSenha(req, res) {
        try {
            const { token, novaSenha } = req.body;
 
            const user = UserModel.pesquisarPorToken(token);
 
            if (!user || !user.resetTokenExpiracao || Date.now() > user.resetTokenExpiracao) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Token inválido ou expirado. Solicite uma nova redefinição.'
                });
            }
 
            // Valida a força da nova senha
            const caseOk = /[A-Z]/.test(novaSenha) && /[a-z]/.test(novaSenha);
            const numberOk = /\d/.test(novaSenha);
            const specialOk = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(novaSenha);
 
            if (novaSenha.length < 8 || !caseOk || !numberOk || !specialOk) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'A senha deve ter ao menos 8 caracteres, letras maiúsculas e minúsculas, número e símbolo.'
                });
            }
 
            const senhaHash = await bcrypt.hash(novaSenha, 10);
 
            // Atualiza senha e limpa o token
            UserModel.redefinirSenha(token, senhaHash);
 
            return res.json({
                sucesso: true,
                mensagem: 'Senha redefinida com sucesso! Você já pode fazer login.'
            });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro interno. Tente novamente.' });
        }
    }
}


module.exports = UserController;

