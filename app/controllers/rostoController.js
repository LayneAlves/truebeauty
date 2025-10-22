exports.renderRosto = (req, res) => {
    res.render('rosto', {
        titulo: 'Rosto Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
