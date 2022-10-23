const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports.findUser = (username) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE username=?", [username], function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                return reject(err);
            }

            return resolve(rows);
        })
    });
};
module.exports.saveUser = (username, password) => {
    return new Promise((resolve, reject) => {
        pool.execute("INSERT INTO users (username, password) VALUES (? ?)", [username, password], function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                return reject(err);
            }

            return resolve(rows);
        })
    });
};
