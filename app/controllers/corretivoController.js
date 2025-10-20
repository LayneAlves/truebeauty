exports.renderCorretivo = (req, res) => {
    res.render('corretivo', {
        titulo: 'Corretivo Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
