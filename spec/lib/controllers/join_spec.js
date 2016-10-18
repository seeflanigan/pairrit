const expect  = require('chai').expect;
const subject = require('../../../lib/controllers/join');

const td      = require('testdouble');

describe('Join Controller', function() {
    it('serializes the result of passing params to the join command', () => {
      const mockJoin = td.replace(subject, 'join');
      // const mockJoin = td.function();

      const params = {
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
      };

      const message = 'Successful result message!';

      td.when(mockJoin(td.matchers.anything()))
        .thenReturn(message);

      const expected = JSON.stringify(message);

      expect(subject(params)).to.deep.equal(expected);
    });

    it('defaults pairName to user_name', () => {
      const mockJoin = td.replace(subject.pairrit, 'join');

      const params = {
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
      };

      td.when(mockJoin(td.matchers.anything()))
      .thenReturn({});

      const expected = JSON.stringify('asdf');

      expect(subject(params)).to.deep.equal(expected);
    });

    it('passes the first argument provided to command as pairName', () => {
      const mockJoin = td.replace(subject.pairrit, 'join');

      const params = {
        token:         'gIkuvaNzQIHg97ATvDxqgjtO',
        team_id:       'T0001',
        team_domain:   'fictional_universe',
        channel_id:    'C2147483705',
        channel_name:  'gotham',
        user_id:       'U2147483697',
        user_name:     'alfred',
        command:       '/pair',
        text:          'join batcave',
        response_url:  'https://hooks.slack.com/commands/1234/5678'
      };

      const message = 'Welcome to the `batcave` pair!';

      td.when(mockJoin(td.matchers.anything()))
      .thenReturn(message);

      const expected = JSON.stringify(message);

      expect(subject(params)).to.deep.equal(expected);
    });
});

