const Pool = require('pg').Pool;

// add your database details here
const pool = new Pool({
	user: 'postgres',
	password: '12341234', // change to your password
	host: 'localhost',
	port: 5432,
	database: 'customers', // create a database called customers first
});

module.exports = pool;
