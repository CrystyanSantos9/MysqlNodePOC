const db = require('./db')
const fs = require('fs')

const initMigration = async(connection)=>{
    const [resuls] = await connection.query(`show tables like 'migration_version';`)
    //nao iniciado versionamento
    if(resuls.length === 0){
        await connection.query('START TRANSACTION;')   
        await connection.query(`
            CREATE TABLE migration_version (
                id INT NOT NULL AUTO_INCREMENT,
                version INT NOT NULL,
                PRIMARY KEY(id)
            );
        `)
        //informa versão 0 da tabela
    await connection.query('INSERT INTO migration_version (id, version) values (1, 0)')   
    await connection.query('COMMIT;') 
    }   
}

const getCurrentVersion = async(connection)=>{
    const [results] = await connection.query('select * from migration_version where id = 1;')
   return results[0].version
}

const migration = async()=>{
    const connection = await db 
    await initMigration(connection)

    const currentVersion = await getCurrentVersion(connection)
    let targetVersion = 1000

    if(process.argv.length > 2){
        if(process.argv[2] === '--target-version' && process.argv[3]){
            targetVersion = parseInt(process.argv[3])
        }
    }
    console.log("Target Version :: ", targetVersion)

    const migrations = fs.readdirSync('./migrations')
    const migrationsSorted = migrations.map(version => {
        return version.split('.')[0]
    }).map(version=> parseInt(version))
    .sort((a, d)=>{
        //ordem crescente
        if(a > d){
            return 1
        }
        return -1
    })

    const migrationSorted2 = [...migrationsSorted].sort((a, d) =>{
        if(a > d){
            return -1
        }
        return 1
    })
    
//Migration UP 
    for await ( const migration of migrationsSorted){
        if(migration > currentVersion && targetVersion >= migration){
            const useMigration = require('./migrations/'+migration+'.js')
            await connection.query('START TRANSACTION;')
            //verifico se a migration existe 
                if(useMigration.up){
                    await useMigration.up(connection)
                    console.log("Migration up :: ", migration)
                }
            await connection.query('UPDATE migration_version SET version = ? WHERE id = ?', [migration, 1])
            await connection.query('COMMIT;')
        }
    }

    //DOWN 
    for await  ( const migration of migrationSorted2){
        if(migration <= currentVersion && targetVersion < migration){
            const useMigration = require('./migrations/' +migration+'.js')
            await connection.query('START TRANSACTION');
            if(useMigration.down){
                await useMigration.down(connection)
                console.log("Migration down :: ", migration)
            }
            const currentMigration = migrationSorted2[migrationSorted2.indexOf(migration) + 1] || 0
            console.log(`Migration atual = ${currentMigration} :: Migration anterior  ${migration}`)
            await connection.query('update migration_version set version = ? where id = ?', [currentMigration, 1])
            await connection.query('COMMIT');
        }
    }
    await connection.close()
}
migration()