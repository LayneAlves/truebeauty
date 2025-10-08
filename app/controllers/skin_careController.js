exports.renderSkin_care = (req, res) => {
    res.render('skin_care', {
        titulo: 'Skin_care Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
