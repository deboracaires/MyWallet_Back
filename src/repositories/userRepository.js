import connection from '../database/database.js';

async function findByEmail(email) {
  const result = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

  return result.rows[0];
}

export {
  findByEmail,
};
