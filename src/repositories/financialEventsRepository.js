/* eslint-disable quotes */
import connection from '../database/database.js';

async function create(userId, value, type, description) {
  const date = new Date();
  const result = await connection.query(`
    INSERT INTO "financialEvents" ("userId", "value", "type", "description", "date") VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [userId, value, type, description, date]);

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
