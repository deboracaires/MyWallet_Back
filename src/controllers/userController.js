/* eslint-disable consistent-return */
import * as userService from '../services/userService.js';
/* eslint-disable no-unused-vars */
async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  const session = await userService.authenticate(email, password);

  if (session) {
    res.send(session.token);
  } else {
    res.sendStatus(401);
  }
}

export {
  signIn,
};
