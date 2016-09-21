// test dependencies
const expect = require('chai').expect;

// our dependencies
const pairrit = require('../lib/pairrit');
const birdkeeper = require('../lib/birdkeeper');

// helpers and other libs
const SHA256 = require('crypto-js/sha256');

// no pairs exist (pairs is empty)
// generate a sha when the a new pair is added
// pair exists
// pair is updated (someone joins or leaves)
// pair ends

describe('Birdkeeper', function() {
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

      const result = birdkeeper.update(currentState, options)

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

      const result = birdkeeper.update(currentState, options)

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

      const result = birdkeeper.update(currentState, options)

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

      const result = birdkeeper.update(currentState, options);

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

      const result = birdkeeper.list(currentState, '#gotham');

      expect(result).to.deep.equal(expected)
    })
  });
});

