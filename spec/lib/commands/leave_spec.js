const expect = require('chai').expect;
const leave  = require('../../../lib/commands/leave');

describe('.leave', function() {
  it('updates a pair when someone leaves', function() {
    const options = {
      userName: 'batman',
      pairName: 'batcave',
      pairState: {name: 'batcave', participants: new Set(['batman', 'alfred'])}
    }

    const expected = { name: 'batcave', participants: new Set(['alfred']) }

    const result = leave(options)

    expect(result).to.deep.equal(expected);
  });

  it('returns undefined when the last participant leaves', function() {
    const options = {
      userName: 'batman',
      pairName: 'batcave',
      pairState: {name: 'batcave', participants: new Set(['batman'])}
    }

    const expected = undefined;

    const result = leave(options)

    expect(result).to.equal(expected);
  });
});
