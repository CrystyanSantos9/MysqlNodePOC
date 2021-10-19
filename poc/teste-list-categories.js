const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig')

const run = async () => {
    try{
        const connection = await mysql.createConnection(dbConfig)
        try{
       const [results, fields]  = await connection.query('select * from categories;')
            console.log(results, )
        }catch(err){
           console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
run()