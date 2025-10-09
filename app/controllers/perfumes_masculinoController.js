exports.renderPerfumes_masculino = (req, res) => {
    res.render('perfumes_masculino', {
        titulo: 'Perfumes_masculino Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};