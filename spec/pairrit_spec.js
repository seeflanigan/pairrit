const expect = require('chai').expect;
const pairrit = require('../lib/pairrit');
const SHA256 = require('crypto-js/sha256');

describe('Pairrit', function() {
  describe('adding a pair' , function() {
    it('generates a sha',  function() {
      const options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'join'
      }

      const key = SHA256(`${options.pairChannel}-${options.pairName}`);

      const currentState = {};

      const expected = {
        [key]: { channel: '#gotham', name: 'batcave', participants: new Set(['batman']) }
      }

      const result = pairrit.update(currentState, options)

      expect(result).to.deep.equal(expected);
    });

    it('returns an updated copy of app state containing the new pair', function() {
      const options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'join'
      }

      const key = SHA256(`${options.pairChannel}-${options.pairName}`);

      const currentState = { pair1: {} };

      const expected = {
        [key]: { channel: '#gotham', name: 'batcave', participants: new Set(['batman']) },
        pair1: {}
      }

      const result = pairrit.update(currentState, options)

      expect(result).to.deep.equal(expected);
    });
  });

  describe('it replaces an existing pair when someone leaves', function () {
    it('needs a better name', function() {
      const options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'leave'
      }

      const key = SHA256(`${options.pairChannel}-${options.pairName}`);

      const currentState = {
        pair1: {},
        [key]: { channel: '#gotham', name: 'batcave', participants: new Set(['batman', 'alfred']) }
      };

      const expected = {
        pair1: {},
        [key]: { channel: '#gotham', name: 'batcave', participants: new Set(['alfred']) }
      }

      const result = pairrit.update(currentState, options)

      expect(result).to.deep.equal(expected);
    });

    it('returns a copy of app state without the pair key if there are no more participants', function(){
      const options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'leave'
      }

      const key = SHA256(`${options.pairChannel}-${options.pairName}`);

      const currentState = {
        [key]: { channel: '#gotham', name: 'batcave', participants: new Set(['batman']) },
        pair1: {},
        pair2: {}
      }

      const expected = {
        pair1: {},
        pair2: {}
      }

      const result = pairrit.update(currentState, options);

      expect(result).to.deep.equal(expected);
    });
  });

  describe('listing pairs', function() {
    function generateKey(pairChannel, pairName) {
      return SHA256(`${pairChannel}-${pairName}`);
    };

    it('list all pairs for a given channel', function() {
      const pairA = {
        channel: '#gotham',
        name: 'batcave',
        participants: new Set(['alfred', 'batman', 'batwoman', 'robin'])
      }

      const pairB = {
        channel: '#gotham',
        name: 'wayne-manor',
        participants: new Set(['bruce-wayne', 'selina-kyle', 'barbara-gordon', 'kate-kane'])
      }

      const pairC = {
        channel: '#xaviers-school-for-gifted-youngsters',
        name: 'x-men',
        participants: new Set(['wolverine', 'cyclops'])
      }

      const currentState = {
        [generateKey('#gotham', pairA.name)]: pairA,
        [generateKey('#gotham', pairB.name)]: pairB,
        [generateKey('#xaviers-school-for-gifted-youngsters', pairC.name)]: pairC
      }

      const expected = [pairA, pairB];

      const result = pairrit.list(currentState, '#gotham');

      expect(result).to.deep.equal(expected)
    })
  });
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
