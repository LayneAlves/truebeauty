exports.renderOlho = (req, res) => {
    res.render('olho', {
        titulo: 'Olho Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
