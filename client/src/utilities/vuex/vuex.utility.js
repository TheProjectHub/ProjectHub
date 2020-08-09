exports.onceCurrentUserIsSet = function(store, callback) {
  const checkIfCurrentUserIsSet = setInterval(() => {
    if (Object.keys(store.state.currentUser).length) {
      callback();
      clearInterval(checkIfCurrentUserIsSet);
    }
  }, 10);
};
