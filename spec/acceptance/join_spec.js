const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

const app = require('../../lib/app');

// Turns out there's really just a single endpoint (right now)
// all this endpoint cares about is the required params in the
// POST, that it accepts the expected headers, and returns json
//
// anything beyond that (eg delegation to commands) is the responsibility
// of the underlying router/controller logic
//
// however, right now, database is mocked out, so maybe we want to test
// here after all, that we make the full round trip successfully
//
// do we want to only stub out the database at the unit test level
// instead of the controller specs? Should we stub out the pairrit
// objects in the controller specs, and just test the contract between
// commands in the controller spec? Yes, this seems fine.
//
// -- acceptance specs exercise the full system e2e --
// test all possible commands with requestParams
//
// -- controller specs just exercise the controller logic
// mock out pairrit, so we don't have to mock the db in them
// "assuming we get XYZ from server, send these msgs to pairrit cmds"
//
// -- unit specs just exercise the pairrit/command logic
// "given  XYZ input from the controller, send ABC result"
// we mock out the db in these specs
//
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
        expect(res.text).to.eql('Welcome to the `alfred` pair!');
        done();
       });
  });

  it('correctly parses the channel name', function(done) {
    const requestParams = {
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
    };

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(requestParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');
        done();
       });
  });

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
