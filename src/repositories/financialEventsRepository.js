/* eslint-disable quotes */
import connection from '../database/database.js';

async function create(user, value, type, description) {
  const result = await connection.query(`
    INSERT INTO "financialEvents" ("userId", "value", "type", "description") VALUES ($1, $2, $3, $4) RETURNING *
    `, [user.id, value, type, description]);

  return result.rows[0];
}

export {
  create,
};
