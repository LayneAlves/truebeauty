exports.renderCabelos = (req, res) => {
    res.render('cabelos', {
        titulo: 'cabelos Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
