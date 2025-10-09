exports.renderNutricao = (req, res) => {
    res.render('nutricao', {
        titulo: 'Nutricao Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};