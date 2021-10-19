const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig')

const run = async () => {
    try{
        const connection = await mysql.createConnection(dbConfig)
        try{
       const [results, fields]  = await connection.query('show databases;')
            console.log(results, fields )
        }catch(err){
           console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
run()