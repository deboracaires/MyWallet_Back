/* eslint-disable quotes */
import connection from '../database/database.js';

async function create(userId, value, type, description) {
  const result = await connection.query(`
    INSERT INTO "financialEvents" ("userId", "value", "type", "description") VALUES ($1, $2, $3, $4) RETURNING *
    `, [userId, value, type, description]);

  return result.rows[0];
}

async function select(userId) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [userId],
  );
  return events;
}

export {
  create,
  select,
};
