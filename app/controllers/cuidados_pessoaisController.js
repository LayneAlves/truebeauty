exports.renderCuidados_pessoais = (req, res) => {
    res.render('cuidados_pessoais', {
        titulo: 'Cuidados_pessoais Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
