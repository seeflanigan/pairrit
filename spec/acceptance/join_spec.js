const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

const app = require('../../lib/app');

describe('POST with `join` command', () => {
  it('accepts content type and returns json', function(done) {
    const requestParams = {
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
      .send(requestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql('Welcome to the `batman` pair');
        done();
       });
  });

  // it('correctly handles complete params', function(done) {
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