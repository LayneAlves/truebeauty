exports.renderBatom = (req, res) => {
    res.render('batom', {
        titulo: 'Batom Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
