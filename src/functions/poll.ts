export const poll = (fn, interval = 1000, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const endTime = Number(new Date()) + timeout;
    const checkCondition = () => {
      const condition = fn();
      console.log('condition', condition);
      if (condition) {
        resolve(condition);
      } else if (Number(new Date()) < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      } else {
        reject(new Error('timed out for ' + fn + ': '));
      }
    };

    setTimeout(checkCondition, interval, resolve, reject);
  });
}
