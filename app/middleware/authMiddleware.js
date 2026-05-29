const jwt = require('jsonwebtoken');
const SECRET = 'ChaveSecreta';

const authMiddleware = {
    verificarLogado(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            if (req.headers['content-type'] === 'application/json') {
                return res.status(401).json({ sucesso: false, mensagem: 'Não autenticado' });
            }
            return res.redirect('/?erro=acesso_negado');
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.clearCookie('token');
            if (req.headers['content-type'] === 'application/json') {
                return res.status(401).json({ sucesso: false, mensagem: 'Sessão expirada' });
            }
            return res.redirect('/login');
        }
    },

    somenteAdmin(req, res, next) {
        if (req.user && req.user.tipo === 'admin') {
            next();
        } else {
            res.status(403).send('Acesso negado: Você não é um administrador.');
        }
    }
};

module.exports = authMiddleware;