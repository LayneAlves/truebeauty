exports.renderReconstrucao = (req, res) => {
    res.render('reconstrucao', {
        titulo: 'Reconstrucao Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
