exports.renderProtetorSolar = (req, res) => {
    res.render('protetorSolar', {
        titulo: 'ProtetorSolar Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
