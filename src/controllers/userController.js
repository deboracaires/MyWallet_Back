/* eslint-disable consistent-return */
import * as userService from '../services/userService.js';
import * as userRepository from '../repositories/userRepository.js';
/* eslint-disable no-unused-vars */
async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const { token, user } = await userService.authenticate(email, password);

    if (token !== null) {
      const { name } = user;
      res.send({ token, name });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
  }
}

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) return res.sendStatus(400);

    const user = await userService.verifyEmail(email);

    if (user !== null) {
      return res.sendStatus(409);
    }

    const result = await userRepository.create(name, email, password);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export {
  signIn,
  signUp,
};
