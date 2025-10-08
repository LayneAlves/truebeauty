exports.renderMaquiagem = (req, res) => {
    res.render('maquiagem', {
        titulo: 'Maquiagem Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
