const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.locals.baseUrl = 'http://localhost:3000';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(express.static(path.join(__dirname, 'app/public')));
app.use(express.static('public'));

const indexRoutes = require('./app/routes/routes');
app.use('/', indexRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

