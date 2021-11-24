import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function authenticate(email, password) {
  const user = userRepository.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const token = uuid();
  const verifySession = await sessionRepository.verify(user);
  let session = [];
  if (verifySession) {
    session = await sessionRepository.update(user, token);
  } else {
    session = await sessionRepository.create(user, token);
  }

  return session;
}

export {
  authenticate,
};
