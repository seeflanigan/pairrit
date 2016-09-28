module.exports = function(options) {
  const newPair = Object.assign({}, options.pairState);

  newPair.participants.delete(options.userName);

  if (newPair.participants.size === 0) {
    return undefined;
  } else {
    return newPair;
  };
};

