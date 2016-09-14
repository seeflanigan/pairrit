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
      var options = {
        userName: 'batman',
        pairName: 'batcave',
        pairState: undefined
      }

      var expected = { name: 'batcave', participants: ['batman'] }

      var result = pairrit.join(options)

      expect(result).to.deep.equal(expected);
    });

    it('adds a user to an existing pair',  function() {
      var options = {
        userName: 'alfred',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: ['batman'] }
      }

      var expected = {
        name: 'batcave', 
        participants: ['batman', 'alfred']
      }

      var result = pairrit.join(options)

      expect(result).to.deep.equal(expected);
    });

    it('updates a pair when someone leaves', function() {
      var options = {
        userName: 'batman',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: ['batman', 'alfred']}
      }

      var expected = { name: 'batcave', participants: ['alfred'] }

      var result = pairrit.leave(options)

      expect(result).to.deep.equal(expected);
    });

    it('returns undefined when the last participant leaves', function() {
      var options = {
        userName: 'batman',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: ['batman']}
      }

      var expected = undefined;

      var result = pairrit.leave(options)

      expect(result).to.equal(expected);
    });
  });
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
