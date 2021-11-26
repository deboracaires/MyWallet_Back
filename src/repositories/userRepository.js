/* eslint-disable function-paren-newline */
import bcrypt from 'bcrypt';
import connection from '../database/database.js';

async function findByEmail(email) {
  const result = await connection.query(`
        SELECT * FROM users WHERE email = $1
    `, [email]);

  return result.rows[0];
}

async function create(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  const result = await connection.query(
    // eslint-disable-next-line quotes
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *
    `, [name, email, hashedPassword]);
  return result.rows[0];
}

export {
  findByEmail,
  create,
};
