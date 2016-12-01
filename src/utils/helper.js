export default function arrayToObject(item) {
  const key = Object.keys(item)[0];
  const result = {};
  result[key] = item[key];
  return result;
}
