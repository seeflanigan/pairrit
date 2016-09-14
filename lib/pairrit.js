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
function joinOrCreatePair(options) {
  var newPair = Object.assign(
    {
      name: options.pairName,
      participants: []
    },
    options.pairState
  );

  newPair.participants.push(options.userName)

  return newPair;
};

function leavePair(options) {
  var newPair = Object.assign({}, options.pairState);
  var index = newPair.participants.indexOf(options.userName);

  newPair.participants.splice(index, 1);

  if( newPair.participants.length == 0 ) {
    return undefined;
  }
  else {
    return newPair;
  };
}

module.exports = {
  join: joinOrCreatePair,
  leave: leavePair
};
