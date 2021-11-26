/* eslint-disable consistent-return */
import connection from '../database/database.js';

async function auth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    // eslint-disable-next-line quotes
    const session = await connection.query(`SELECT * FROM sessions WHERE "token" = $1`, [token]);

    if (session.rowCount === 0) {
      return res.sendStatus(401);
    }
    next();
  } catch {
    return res.sendStatus(401);
  }
}

export {
  auth,
};
