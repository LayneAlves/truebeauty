exports.renderPerfumes_infantil = (req, res) => {
    res.render('perfumes_infantil', {
        titulo: 'Perfumes_infantil Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};