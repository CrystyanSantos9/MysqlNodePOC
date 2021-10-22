const up = async (connection)=>{
    await connection.query(`
    CREATE TABLE departments (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
    `)
}

const down = async (connection)=>{
    await connection.query('DROP TABLE departments;')
}

module.exports = {
    up, down
}