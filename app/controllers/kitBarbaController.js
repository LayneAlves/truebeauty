exports.renderKitBarba = (req, res) => {
    res.render('KitBarba', {
        titulo: 'KitBarba Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
