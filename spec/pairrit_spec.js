var expect = require('chai').expect;
var pairrit = require('../lib/pairrit');

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

