import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

async function verifyTypeValue(type, value) {
  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return false;
  }
  if (value < 0) {
    return false;
  }

  return true;
}

async function doSumHistory(userId) {
  const events = await financialEventsRepository.select(userId);
  const sum = events.rows.reduce((total, event) => (event.type === 'INCOME' ? total + event.value : total - event.value), 0);
  return sum;
}

export {
  verifyTypeValue,
  doSumHistory,
};
