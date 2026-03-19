exports.renderfor_adm = (req, res) => {
    res.render('for_adm', {
        titulo: 'for_adm Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};