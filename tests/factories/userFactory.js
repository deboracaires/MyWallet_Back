import bcrypt from 'bcrypt';
import faker from 'faker';

import connection from '../../src/database/database.js';

export async function createUser({ name, email, password } = {}) {
  const newUser = {
    name: name || faker.name.findName(),
    email: email || faker.internet.email(),
    password: password || '123456',
    hashedPassword: bcrypt.hashSync(password || '123456', 10),
  };

  const user = await connection.query(`
        INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING * 
    `, [newUser.name, newUser.email, newUser.hashedPassword]);

  newUser.id = user.rows[0].id;

  return newUser;
}
