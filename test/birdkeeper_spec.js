// test dependencies
var expect = require('chai').expect;

// our dependencies
var pairrit = require('../lib/pairrit');
var birdkeeper = require('../lib/birdkeeper');

// helpers and other libs
var SHA256 = require('crypto-js/sha256');

// no pairs exist (pairs is empty)
// generate a sha when the a new pair is added
// pair exists
// pair is updated (someone joins or leaves)
// pair ends

describe('Birdkeeper', function() {
  describe('adding a pair' , function() {
    it('generates a sha',  function() {
      var options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'join'
      }

      var key = SHA256(`${options.pairChannel}-${options.pairName}`);

      var currentState = {};

      var expected = {
        [key]: { name: 'batcave', participants: ['batman'] }
      }

      var result = birdkeeper.update(currentState, options)

      expect(result).to.deep.equal(expected);
    });

    it('returns an updated copy of app state containing the new pair', function() {
      var options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'join'
      }

      var key = SHA256(`${options.pairChannel}-${options.pairName}`);

      var currentState = { pair1: {} };

      var expected = {
        [key]: { name: 'batcave', participants: ['batman'] },
        pair1: {}
      }

      var result = birdkeeper.update(currentState, options)

      expect(result).to.deep.equal(expected);
    } )

  });

  describe('it replaces an existing pair when someone leaves', function () {
    it('needs a better name', function() {
      var options = {
        userName: 'batman',
        pairChannel: '#gotham',
        pairName: 'batcave',
        command: 'leave'
      }

      var key = SHA256(`${options.pairChannel}-${options.pairName}`);

      var currentState = {
        pair1: {},
        [key]: { name: 'batcave', participants: ['batman', 'alfred'] }
      };

      var expected = {
        pair1: {},
        [key]: { name: 'batcave', participants: ['alfred'] }
      }

      var result = birdkeeper.update(currentState, options)

      expect(result).to.deep.equal(expected);
    } )
  })

  describe('the list command', function() {
    function generateKey(pairChannel, pairName) {
      return SHA256(`${pairChannel}-${pairName}`);
    };

    it('generates a meaningful report of pairs based on current state', function() {
      var pairA = {
        name: 'batcave',
        participants: ['alfred', 'batman', 'batwoman', 'robin']
      }

      var pairB = {
        name: 'wayne-manor',
        participants: ['bruce-wayne', 'selina-kyle', 'barbara-gordon', 'kate-kane']
      }

      var currentState = {
        [generateKey('#gotham', pairA)]: pairA,
        [generateKey('#gotham', pairB)]: pairB
      }

      var expected = {
        // we need to know more about what we are publishing to Slack before we can proceed here
        // we'll probably format some kind of message, but what? data table? string?
        // we don't know the datatype or structure of this yet
        // will possibly report something like this
        //
        // Pair Name       | Participants      | Focus:
        // ---------------------------------------------------
        // batcave         | alfred, batman... | Issue #42
        // wayne-manor     | bruce, selina...  | Gif Trolling
        // ... (more rows)
      }

      // expect(result).to.equal(expected)
    })
  });
});

