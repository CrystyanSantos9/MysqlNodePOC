const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig')

const run = async () => {
    try{
        const connection = await mysql.createConnection(dbConfig)
        try{
       const [results ]  = await connection.query('insert into products (product, price) values (?,?);', ['Aparelho de Som', 677])
       await connection.query('insert into categories_products (product_id, category_id) values (?,?);', [results.insertId, 3])
            console.log(results, )
        }catch(err){
           console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
run()