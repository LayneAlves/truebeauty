exports.renderPerfumes_feminino = (req, res) => {
    res.render('perfumes_feminino', {
        titulo: 'Perfumes_feminino Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
