exports.renderDepilacao = (req, res) => {
    res.render('depilacao', {
        titulo: ' Depilacao Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};