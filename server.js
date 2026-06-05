const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
// const email = require('./app/config/email');


app.use((req, res, next) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');

    app.locals.baseUrl = `${protocol}://${host}`;
    next(); 
});

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app/public')));

const indexRoutes = require('./app/routes/routes');
app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em port ${PORT}`);
});
