import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function authenticate(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { token: null, user: null };
  }
  const token = uuid();

  const verifySession = await sessionRepository.verify(user);
  if (verifySession) {
    await sessionRepository.update(user, token);
  } else {
    await sessionRepository.create(user, token);
  }

  return { token, user };
}

async function verifyEmail(email) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return null;
  }
  return user;
}

export {
  authenticate,
  verifyEmail,
};
