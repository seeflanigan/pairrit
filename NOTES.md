We realize that the batcave is not a very inclusive environment-
and have so far opted for story-based accuracy versus diversity in our test data.

Maybe we'll replace the batman theme (a subtle nod to the name of
the team who inspired this library) and go all-in on the parrot
theme, (also a nod to the team - parrot wave!) and make it
gender aspecific, by using parrot species for all of the
participant names

This would also be fun because we can use different jungles and exotic environments as our mock channel names

Also we have pairrit and birdkeeper, and have been discussing structure and organization in terms of what
concepts and abstractions make sense.

// Some Test concepts and assumptions: (random sketch)

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
