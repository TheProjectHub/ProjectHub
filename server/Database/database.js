const mysql = require('mysql');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

function createNewConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASS,
        database: 'projecthub',
    });
    return connection
}

function endConnection(connection) {
    connection.end((err) => {
        if (err) throw err;
    })
}

module.exports = { createNewConnection: createNewConnection, endConnection: endConnection }