exports.renderProdutos = (req, res) => {
    res.render('produtos', {
        titulo: 'Produtos Truebeauty',
        baseUrl: req.app.locals.baseUrl
    });
};
