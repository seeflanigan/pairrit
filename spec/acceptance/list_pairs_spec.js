const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

const app = require('../../lib/app');

describe('Listing Pairs', () => {
  it('responds with a message if there are no pairs', function(done) {
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

  it('returns a pair with at least one participant', function(done) {
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

  // it('correctly parses the channel name', function(done) {
  //   const requestParams = {
  //     token:         'gIkuvaNzQIHg97ATvDxqgjtO',
  //     team_id:       'T0001',
  //     team_domain:   'fictional_universe',
  //     channel_id:    'C2147483705',
  //     channel_name:  'gotham',
  //     user_id:       'U2147483697',
  //     user_name:     'batman',
  //     command:       '/pair',
  //     text:          'join batcave',
  //     response_url:  'https://hooks.slack.com/commands/1234/5678'
  //   };

  //   request(app)
  //     .post('/')
  //     .type('application/x-www-form-urlencoded')
  //     .set('Accept', 'application/json')
  //     .send(requestParams)
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       expect(res.text).to.eql('Welcome to the `batcave` pair!');
  //       done();
  //      });
  // });

  // it('correctly handles incomplete params', function(done) {
  //   request(server)
  //     .post('/join')
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       done();
  //     });
  // });
});
