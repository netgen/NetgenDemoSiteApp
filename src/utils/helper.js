export function arrayToObject(result, item) {
  const key = Object.keys(item)[0];
  result[key] = item[key];
  return result;
};
