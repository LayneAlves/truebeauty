exports.renderBruma = (req, res) => {
    res.render('bruma', {
        titulo: 'Bruma Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
