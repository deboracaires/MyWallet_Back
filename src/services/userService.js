import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

async function authenticate(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { token: null, user: null };
  }
  const token = jwt.sign({
    id: user.id,
  }, `${process.env.JWT_SECRET}`);

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
