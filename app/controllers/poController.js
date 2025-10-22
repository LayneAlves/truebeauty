exports.renderPo = (req, res) => {
res.render('po', {
        titulo: 'Po Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
