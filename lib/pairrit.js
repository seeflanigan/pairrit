// allThePairs = {
//   { pairs: [
//       { sha: 'aes256', name: 'first', participants: 'first-user' }
//       { sha: 'bes256', name: 'rest', participants: 'next-user' }
//     ]
//   }
// }
//
// we need a top-level object to parse the message, username, call 'join', and pass in the current state of the pair (if one exists)
// this will call the hashing /pariti
  // make a new updated copy of pair state
  // record the new state
  // record the join event when new state is recorded successfully

// receives current state and returns an updated copy of state
// invokes a side effect to record a 'join' event for analytics
// always returns a pair
function joinOrCreatePair(userName, pairName, pairState) {
  var newPair = Object.assign({ name: pairName, participants: [] }, pairState);

  newPair.participants.push(userName)

  return newPair;
};

module.exports = {
  join: joinOrCreatePair
};
