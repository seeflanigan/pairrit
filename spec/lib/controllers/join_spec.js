const expect  = require('chai').expect;
const subject = require('../../../lib/controllers/join');

const td      = require('testdouble');

describe('Join Controller', function() {
  const mockRequest = {
    body: {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'alfred',
      command:       '/pair',
      text:          'join',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    }
  };

  const mockResponse = {
    send: () => {}
  }

  it('serializes the result of passing params to the join command', () => {
    // determine how to mock out `pairrit.join`
    // using `testdouble.js`
    // in this context
    //

    const message = 'Successful result message!';

    const expected = JSON.stringify(message);

    expect(subject(mockRequest, mockResponse)).to.deep.equal(expected);
  });

  it('defaults pairName to user_name', () => {
    const expected = JSON.stringify('asdf');

    expect(subject(mockRequest, mockResponse)).to.deep.equal(expected);
  });

  it('passes the first argument provided to command as pairName', () => {
    const message = 'Welcome to the `batcave` pair!';

    const expected = JSON.stringify(message);

    expect(subject(mockRequest, mockResponse)).to.deep.equal(expected);
  });
});

