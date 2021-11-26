/* eslint-disable consistent-return */
import * as financialEventsService from '../services/financialEventService.js';
import * as financialEventsRepository from '../repositories/financialEventsRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function postFinancialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split('Bearer ')[1];
    const { userId } = await sessionRepository.select(token);

    const { value, type, description } = req.body;

    if (!value || !type || !description) {
      return res.sendStatus(400);
    }

    const typeValue = await financialEventsService.verifyTypeValue(type, value);

    if (!typeValue) {
      return res.sendStatus(400);
    }
    await financialEventsRepository.create(userId, value, type, description);
    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getFinancialHistory(req, res) {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split('Bearer ')[1];
    const { userId } = await sessionRepository.select(token);

    const history = await financialEventsRepository.select(userId);

    res.send(history.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getFinancialSum(req, res) {
  const authorization = req.headers.authorization || '';
  const token = authorization.split('Bearer ')[1];
  const { userId } = await sessionRepository.select(token);

  const sum = await financialEventsService.doSumHistory(userId);

  return res.send({ sum });
}

export {
  postFinancialEvent,
  getFinancialHistory,
  getFinancialSum,
};
