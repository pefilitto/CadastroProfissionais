import mysql2 from 'mysql2/promise';
export default function conectar(){
    
    if(global.poolConexoes)
        return global.poolConexoes;
    else{
        const poolConexoes = mysql2.createPool({
            host: 'localhost',
            port: 3306,
            database: 'profissionais',
            user: 'root',
            password: '',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
        })
        global.poolConexoes = poolConexoes;
        return poolConexoes;
    }
    
}