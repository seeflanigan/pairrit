const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

const app = require('../../lib/app');

describe('POST with `join` command', () => {
  it('accepts content type and returns json', (done) => {
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

  it('respects a channel name option', (done) => {
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

  it.only('adds you to an existing pair', (done) => {
    const firstJoinParams = {
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

    const secondJoinParams = {
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

    const listParams = {
      token:         'gIkuvaNzQIHg97ATvDxqgjtO',
      team_id:       'T0001',
      team_domain:   'fictional_universe',
      channel_id:    'C2147483705',
      channel_name:  'gotham',
      user_id:       'U2147483697',
      user_name:     'batman',
      command:       '/pair',
      text:          'list',
      response_url:  'https://hooks.slack.com/commands/1234/5678'
    };

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(firstJoinParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');
      });

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(secondJoinParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');
      });

    const expectedResponse = {
      "response_type": "in_channel",
      "text":          "The following pairs are in progress:",
      "attachments": [{
        "fallback": "",
        "title":    "batcave (1 participant)",
        "text":     "alfred, batman"
      }]
    };

    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(listParams)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(JSON.parse(res.text)).to.eql(expectedResponse);
        done();
      });
  });


  it('implicitly removes you from a pair if you join another', (done) => {
    done();
  });
});
