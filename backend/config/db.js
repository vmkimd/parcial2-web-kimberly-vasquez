const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',
  database: 'parcial_web',
  password: '1234', 
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conexión exitosa a PostgreSQL');
  }
});

module.exports = pool;