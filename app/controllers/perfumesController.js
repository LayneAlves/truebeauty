exports.renderPerfumes = (req, res) => {
    res.render('perfumes', {
        titulo: 'Perfumes Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
