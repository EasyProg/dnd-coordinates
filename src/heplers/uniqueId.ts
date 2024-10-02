const uniqueId = (prefix = ''): string =>
  [prefix, new Date().getTime().toString(), Math.random()].filter(Boolean).join('-');

export { uniqueId };
