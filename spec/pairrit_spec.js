const expect = require('chai').expect;
const pairrit = require('../lib/pairrit');

describe('Pairrit', function() {
  describe('/pair join' , function() {
    it('creates a new pair with the given user and name',  function() {
      const options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        pairState: undefined
      }

      const expected = { channel: '#gotham', name: 'batcave', participants: new Set(['batman']) }

      const result = pairrit.join(options)

      expect(result).to.deep.equal(expected);
    });

    it('adds a user to an existing pair',  function() {
      const options = {
        userName: 'alfred',
        pairChannel: '#gotham',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: new Set(['batman']) }
      }

      const expected = {
        channel: '#gotham',
        name: 'batcave', 
        participants: new Set(['batman', 'alfred'])
      }

      const result = pairrit.join(options)

      expect(result).to.deep.equal(expected);
    });

    it('updates a pair when someone leaves', function() {
      const options = {
        userName: 'batman',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: new Set(['batman', 'alfred'])}
      }

      const expected = { name: 'batcave', participants: new Set(['alfred']) }

      const result = pairrit.leave(options)

      expect(result).to.deep.equal(expected);
    });

    it('returns undefined when the last participant leaves', function() {
      const options = {
        userName: 'batman',
        pairName: 'batcave',
        pairState: {name: 'batcave', participants: new Set(['batman'])}
      }

      const expected = undefined;

      const result = pairrit.leave(options)

      expect(result).to.equal(expected);
    });
  });
});
