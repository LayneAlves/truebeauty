exports.renderCategorias = (req, res) => {
    res.render('categorias', {
        titulo: 'Categorias Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
