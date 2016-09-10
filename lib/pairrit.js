// receives current state and returns an updated copy of state
// invokes a side effect to record a 'join' event for analytics
function joinOrCreatePair() {
  // make a new updated copy of state
  // record the new state
  // record the join event when new state is recorded successfully
  return true;
};

module.exports = {
  join: joinOrCreatePair
};
