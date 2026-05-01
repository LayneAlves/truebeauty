const jwt = require('jsonwebtoken');
const SECRET = 'SuaChaveSecretaSuperSegura'; // Deve ser a mesma chave do Controller

const authMiddleware = {
    // Bloqueia quem não está logado
    verificarLogado(req, res, next) {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/login'); // Ou a rota da sua página de login
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            req.user = decoded; // Salva id, nome e tipo para usar no EJS/Rotas
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
            res.status(403).send('Acesso negado: Esta área é exclusiva para administradores.');
        }
    }
};

module.exports = authMiddleware;
