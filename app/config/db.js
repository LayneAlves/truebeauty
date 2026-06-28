const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'reseau.proxy.rlwy.net',
    port: 23280,
    user: 'root',
    password: 'HZVPzUCrIJAyrrrjGUCYccUlaoXysLxFl',
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;