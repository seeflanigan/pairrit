const expect = require('chai').expect;
const SHA256 = require('crypto-js/sha256');
const list   = require('../../../lib/commands/list');

describe('.list', function() {
  function generateKey(pairChannel, pairName) {
    return SHA256(`${pairChannel}-${pairName}`);
  };

  it('lists all pairs for a given channel', function() {
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

    const result = list(currentState, '#gotham');

    expect(result).to.deep.equal(expected)
  })
});
