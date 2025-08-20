exports.renderIndex = (req, res) => {
    res.render('index', {
        titulo: 'Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};