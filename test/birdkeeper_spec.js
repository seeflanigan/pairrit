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
  describe('a new pair' , function() {
    it('generates a sha',  function() {
      var options = {
        userName: 'batman',
        pairName: 'batcave',
        command: 'join'
      }

      var currentState = {};

      var key = SHA256(options['pairName']);

      var expected = {
        [key]: { name: 'batcave', participants: ['batman'] }
      }

      var result = birdkeeper.update(options, currentState)

      expect(result).to.deep.equal(expected);
    });
  });
});
