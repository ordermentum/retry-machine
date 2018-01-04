const nullLogger = require('null-logger');

// @flow
const wait = (ms: number) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, ms),
  );

const backoff = (delay: number, factor: number, attempt: number) =>
  Math.round(delay * factor ** attempt);

type Config = {
  max?: number,
  delay?: number,
  factor?: number,
  logger?: mixed => void,
};

function retry(
  { max = 3, delay = 1000, factor = 1, logger = nullLogger }: Config = {},
  failure: Function = async () => {},
): Function {
  return async function closure(promise, ...args) {
    let attempts = max || 3;
    let result = null;

    /* eslint-disable no-await-in-loop */
    while (attempts > 0) {
      try {
        logger.info('Retry Machine: ', ...args);
        result = await promise(...args);
        break;
      } catch (e) {
        attempts -= 1;
        await failure(e, attempts);

        if (delay > 0) {
          await wait(backoff(delay, factor, max - attempts));
        }

        if (attempts === 0) {
          throw e;
        }
      }
    }

    return result;
  };
}

module.exports = {
  retry,
  wait,
  backoff,
};
