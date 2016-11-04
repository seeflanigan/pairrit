const expect  = require('chai').expect;
const request = require('supertest');
const _       = require('lodash/fp');

const app = require('../../lib/app');

describe('Listing Pairs', () => {
  it('responds with a message if there are no pairs', (done) => {
    const listRequestParams = {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'alfred',
      command:       '/pair',
      text:          'list',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    };

    const expectedMessage = 'This channel has no pairs in progress.'
      + ' ' + 'Begin one now using `/pair join`!'

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(listRequestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql(expectedMessage);
        done();
      });
  });

  it('returns a pair with at least one participant', (done) => {
    // Create a Pair
    const joinRequestParams = {
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

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(joinRequestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });


    // List Pairs
    const listRequestParams = {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'alfred',
      command:       '/pair',
      text:          'list',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    };

    const expectedPair = {
      fallback: '',
      title: 'alfred (1 participant)',
      text: 'alfred'
    }

    const expectedResponse = {
      response_type: 'in_channel',
      text: 'The following pairs are in progress:',
      attachments: [expectedPair]
    };

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(listRequestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql(JSON.stringify(expectedResponse));
        done();
       });
  });

  it.only('only returns the most recent copy of a pair', (done) => {
    const joinRequestsParams = [{
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
    }, {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'batwoman',
      command:       '/pair',
      text:          'join batcave',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    }, {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'joker',
      command:       '/pair',
      text:          'join arkham',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    }, {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'batman',
      command:       '/pair',
      text:          'join batcave',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    }, {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'catwoman',
      command:       '/pair',
      text:          'join arkham',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    }];

    _.map((joinRequestParams) => {
      request(app)
        .post('/')
        .type('application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
        .send(joinRequestParams)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });
    }, joinRequestsParams);

    // List Pairs
    const listRequestParams = {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'bruce',
      command:       '/pair',
      text:          'list',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    };

    const expectedPairs = [{
      fallback: '',
      title: 'batcave (3 participants)',
      text: 'alfred, batwoman, batman'
    }, {
      fallback: '',
      title: 'arkham (2 participants)',
      text: 'joker, catwoman'
    }]

    const expectedResponse = {
      response_type: 'in_channel',
      text: 'The following pairs are in progress:',
      attachments: expectedPairs
    };

    // exercise our behavior
    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(listRequestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql(JSON.stringify(expectedResponse));
        done();
       });
  });
});
