exports.onceAuthIsLoaded = function(auth, callback) {
  const checkIsAuthLoaded = setInterval(() => {
    if (!auth.loading) {
      callback();
      clearInterval(checkIsAuthLoaded);
    }
  }, 10);
};
