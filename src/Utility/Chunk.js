function chunk(...args) {
  const [arr, len] = args;
  const rest = [];
  for (let i = 0; i < arr.length; i += len) { rest.push(arr.slice(i, i + len)); }
  return rest;
}

module.exports = { chunk };
