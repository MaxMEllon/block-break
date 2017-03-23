const isMethod = (key, obj) => obj !== 'constructor' && typeof obj[key] === 'function';

const binder = (args) => {
  const self = args;
  Object.getOwnPropertyNames(Object.getPrototypeOf(self)).forEach((key) => {
    if (isMethod(key, self)) {
      self[key] = self[key].bind(self);
    }
  });
};

export default binder;
