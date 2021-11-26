/* eslint-disable quotes */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
import faker from 'faker';
import connection from '../../src/database/database.js';

export async function createFinancialEvent(user, { value, type, description } = {}) {
  const types = ['INCOME', 'OUTCOME'];
  type = type || types[((Math.random() * 2) << 0)];

  const data = {
    value: value || ((Math.random() * 1000000000) << 0),
    type,
    description: description || faker.lorem.words(3),
  };

  const event = await connection.query(`
        INSERT INTO "financialEvents" ("userId", "value", "type", description) VALUES ($1, $2, $3, $4) RETURNING *
    `, [user.id, data.value, data.type, data.description]);

  // eslint-disable-next-line max-len
  const returnedBody = {
    id: event.rows[0].id,
    value: data.value,
    type: data.type,
    description: data.description,
    userId: user.id,
  };
  return returnedBody;
}
