const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '216.172.172.19',
    port: 3306,
    user: 'danil458_truebeauty',
    password: '@ITBtruebeauty',
    database: 'danil458_truebeautyBD',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;