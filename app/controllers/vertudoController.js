exports.renderVertudo = (req, res) => {
    res.render('vertudo', {
        titulo: 'vertudo Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
