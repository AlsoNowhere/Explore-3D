export const get = (object, property, action) => {
  Object.defineProperty(object, property, {
    get() {
      return action.apply(this);
    },
  });
};
