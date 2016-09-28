const expect = require('chai').expect;
const pairrit = require('../../lib/pairrit');
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
});

