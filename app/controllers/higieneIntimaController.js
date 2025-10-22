exports.renderHigieneIntima = (req, res) => {
    res.render('higieneIntima', {
        titulo: 'HigieneIntima Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
