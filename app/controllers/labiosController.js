exports.renderLabios = (req, res) => {
    res.render('labios', {
        titulo: 'Labios   Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
