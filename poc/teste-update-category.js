const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig')

const run = async () => {
    try{
        const connection = await mysql.createConnection(dbConfig)
        try{
       const [results, fields]  = await connection.query('update categories set category = ? where id = ?;', ['Limpeza e Saúde',5])
            console.log(results, )
        }catch(err){
           console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
run()