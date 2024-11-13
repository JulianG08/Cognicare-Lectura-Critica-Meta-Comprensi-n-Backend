//conexión a la base de datos
import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'metacomprension',
    password: 'Tokisaki22',
    port: '5432'
});

pool.connect()
    .then(() => console.log('Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexión', err));

export default pool;