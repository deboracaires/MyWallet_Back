import connection from '../database/database.js';

async function create(user, token) {
  const result = await connection.query(`
      INSERT INTO sessions
      (token, "userId")
      VALUES ($1, $2)
      RETURNING *
    `, [token, user.id]);

  return result.rows[0];
}
async function verify(user) {
  const result = await connection.query(`
        SELECT * FROM sessions WHERE "userId" = $1
    `, [user.id]);

  if (result.rowCount === 0) {
    return false;
  }

  return true;
}

async function update(user, token) {
  const result = await connection.query(`
        UPDATE sessions
        SET token = $2
        WHERE "userId" = $1
        RETURNING *
      `, [user.id, token]);
  return result.rows[0];
}

async function select(token) {
  const result = await connection.query(`
        SELECT * FROM sessions
        WHERE token = $1
      `, [token]);
  return result.rows[0];
}

export {
  create,
  verify,
  update,
  select,
};
