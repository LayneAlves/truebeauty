exports.renderPrimer = (req, res) => {
    res.render('primer', {
        titulo: 'Primer Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};

