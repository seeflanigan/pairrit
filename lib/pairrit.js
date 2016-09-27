function joinOrCreatePair(options) {
  const newPair = Object.assign(
    {
      channel: options.pairChannel,
      name: options.pairName,
      participants: new Set()
    },
    options.pairState
  );

  newPair.participants.add(options.userName)

  return newPair;
};

function leavePair(options) {
  const newPair = Object.assign({}, options.pairState);

  newPair.participants.delete(options.userName);

  if (newPair.participants.size === 0) {
    return undefined;
  } else {
    return newPair;
  };
}

module.exports = {
  join: joinOrCreatePair,
  leave: leavePair
};
