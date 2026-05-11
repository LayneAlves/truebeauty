const jwt = require('jsonwebtoken');
const SECRET = 'ChaveSecreta';

const authMiddleware = {
    // Bloqueia quem não está logado
    verificarLogado(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/?erro=acesso_negado');
            // return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
    },

    // Bloqueia quem não é admin
    somenteAdmin(req, res, next) {
        if (req.user && req.user.tipo === 'admin') {
            next();
        } else {
            res.status(403).send('Acesso negado: Você não é um administrador.');
        }
    }
};

module.exports = authMiddleware;
