exports.renderOlhos = (req, res) => {
    res.render('olhos', {
        titulo: 'Olhos   Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
