const mysql = require('mysql2/promise')
const dbConfig = require('./config/dbConfig')

//module.exports = mysql.createConnection(dbConfig)

module.exports = mysql.createPool(dbConfig)

