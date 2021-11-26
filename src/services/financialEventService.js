async function verifyTypeValue(type, value) {
  if (!['INCOME', 'OUTCOME'].includes(type)) {
    return false;
  }
  if (value < 0) {
    return false;
  }

  return true;
}

export {
  verifyTypeValue,
};
