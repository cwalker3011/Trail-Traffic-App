const { Pool } = require('pg');
const secret = require('../../secrets');

const PG_URI = secret.postgres_uri;

const pool = new Pool({
  connectionString: PG_URI
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};