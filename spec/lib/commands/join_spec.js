const expect = require('chai').expect;
const join   = require('../../../lib/commands/join');

describe('.join' , function() {
  it('creates a new pair with the given user and name',  function() {
    const options = {
      userName: 'batman',
      pairChannel: '#gotham',
      pairName: 'batcave',
      pairState: undefined
    }

    const expected = { channel: '#gotham', name: 'batcave', participants: new Set(['batman']) }

    const result = join(options)

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

    const result = join(options)

    expect(result).to.deep.equal(expected);
  });
});

