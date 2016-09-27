// COMMANDS:
//
// pair list - list active pairs and people looking to pair
// pair join - creates or joins a pair
// pair leave - leaves or destroys a pair
// pair help - display a help message
// pair on - activate "looking for a pair" status
// pair off - de-activate "looking for a pair" status



// POSSIBLE CASES:
//
// no pairs exist (pairs is empty)
// generate a sha when the a new pair is added
// pair exists
// pair is updated (someone joins or leaves)
// pair ends



// /pair join #pairrit
//
// events:
//
// user         #pair-id   action   time
// -----------------------------------------
// @adeschamps  #pairrit   join     12:00
// @jchambers   #pairrit   join     12:01
// @cflanigan   #pairrit   join     12:12

// if all state is immutable, and the current state is just a projection of state change over time
// how do we know and display the current state of the application
// if we are only showing events within 12 hours, we may have a user in a pair who joined > 12 ago, and has not left yet

// events while you were pairing: who is in the pair when you join
// if you're already in a pair, joining a different pair is an implicit leave (v1)
// if you're already in a pair, you see buttons "do you want to switch?" 

// * when do we stop showing a pair on the list (eg 12 hours with 0 users)

// /pair join - no pair name, pair doesn't exist for my username
// Create a pair named after my username
//
// /pair join - no pair name, already in the pair
// No-op
//
// /pair join pairrit - pair name given, pair doesn't exist yet
// Create a pair named 'pairrit', adds my user to participants
//
// /pair join pairrit - pair name given, pair does exist
// Adds my unsername to participants for 'pairrit'
//
// /pair join pairrit - pair name given, already in pairrit
// no-op
//
// /pair join teamBatman - pair name given, you're already in pairrit
// no-op, vs implicit '/leave'



// it('generates a pair id (sha) when a pair is created', function() {
//   // expect(pair).to have a sha
//   // this is probably about validating that the state is stored
//   // under the correct hash key in the 'pairs' state collection
// });
//
// it('passes the user name as the pair name if no pair name is given', function(){
// })
//
// it('passes the current state of the pair if one is found', function() {
// }
//
// it('passes undefined for pairState if no pair is found', function() {
// })
//
// it('ends a pair when the last person leaves', function() {
//   // removes it from the current state collection
// });
//
//
//     it('lists pairs if any are in progress', function() {
//       // pairrit.list()
//       // read application state
//       // expect('/pair join').to be_a_thing
//     });
//
//
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

