exports.renderHidratacao = (req, res) => {
    res.render('hidratacao', {
        titulo: 'Hidratacao Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
