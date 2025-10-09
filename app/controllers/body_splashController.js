exports.renderBody_splash = (req, res) => {
    res.render('body_splash', {
        titulo: 'Body_splash Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
