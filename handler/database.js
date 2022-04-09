const mysql = require('mysql');
const config = require('../config.json');7

const connection = mysql.createConnection(config.database);

connection.connect(function (error) {
    if (error) return console.error(error);

    console.log(`\x1b[35mLOADER \x1b[37m» \x1b[35mSuccessfully connected to the database`);
});

module.exports = connection;