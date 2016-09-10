var expect = require('chai').expect;
var pairrit = require('../lib/pairrit');

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

describe('Pairrit', function() {
  describe('/pair join' , function() {
    it('creates a new pair with the given user and name',  function() {
      var expected = { name: 'batman', participants: ['batman'] }

      var result = pairrit.join('batman', 'batman', undefined)

      expect(result).to.deep.equal(expected);
    });

    it('accepts a name for the pair to create or join', function() {
      // expect(pairrit.join('pairrit')).to.be.true
    });

    it('generates a pair id (sha) when a pair is created', function() {
      // expect(pair).to have a sha
    });

    it('updates a pair when someone leaves', function() {
    });

    it('ends a pair when the last person leaves', function() {
    });

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

    it('lists pairs if any are in progress', function() {
      // pairrit.list()
      // read application state
      // expect('/pair join').to be_a_thing
    });
  });
});
