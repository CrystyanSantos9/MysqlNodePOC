const up = async (connection)=>{
    await connection.query(`
    CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
    `)
}

const down = async (connection)=>{
    await connection.query('DROP TABLE users;')
}

module.exports = {
    up, down
}