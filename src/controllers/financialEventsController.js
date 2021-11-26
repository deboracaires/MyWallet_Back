/* eslint-disable consistent-return */
import * as financialService from '../services/financialEventService.js';
import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

async function postFinancialEvent(req, res) {
  try {
    const { user } = res.locals;

    const { value, type, description } = req.body;

    if (!value || !type || !description) {
      return res.sendStatus(400);
    }

    const typeValue = await financialService.verifyTypeValue(type, value);

    if (!typeValue) {
      return res.sendStatus(400);
    }
    await financialEventsRepository.create(user, value, type, description);
    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getFinancialHistory(req, res) {
  try {
    const { user } = res.locals;

    const history = await financialEventsRepository.select(user);

    res.send(history.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export {
  postFinancialEvent,
  getFinancialHistory,
};
