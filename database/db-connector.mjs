/*
Code adapted from samples provided by Oregon State University, CS 340 - Databases.
    - URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
    - Date Accessed:
        - Various dates
        - First Access: 2024/07/19
        - Most Recent Access: 2024/07/25
*/

// Get an instance of mysql we can use in the app
// var mysql = require('mysql')
import mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : '**********',
    user            : '**********',
    password        : '**********',
    database        : '**********'
})

// Export it for use in our applicaiton
//module.exports.pool = pool;
export default pool;