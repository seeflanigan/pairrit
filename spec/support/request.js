const _       = require('lodash/fp');
const request = require('supertest');

const app = require('../../lib/app');

const baseRequest = {
  token:         'gIkuvaNzQIHg97ATvDxqgjtO',
  team_id:       'T0001',
  team_domain:   'fictional_universe',
  channel_id:    '',
  channel_name:  'gotham',
  user_id:       'U2147483697',
  user_name:     '',
  command:       '/pair',
  text:          '',
  response_url:  'https://hooks.slack.com/commands/1234/5678'
}


function sendJoinRequest(channel_id, user_name, pair_name) {
  const requestParams = _.assign(baseRequest, {
    channel_id: channel_id,
    user_name: user_name,
    text: pair_name ? `join ${pair_name}` : 'join'
  });

  return new Promise((resolve, reject) => {
    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(requestParams)
      .end(function(err, res) {
        if (err) return reject(err);
        resolve(res)
       });
  })
}

function sendListRequest(channel_id) {
  const listParams = {
    token:         'gIkuvaNzQIHg97ATvDxqgjtO',
    team_id:       'T0001',
    team_domain:   'fictional_universe',
    channel_id:    channel_id,
    channel_name:  'gotham',
    user_id:       'U2147483697',
    user_name:     'batman',
    command:       '/pair',
    text:          'list',
    response_url:  'https://hooks.slack.com/commands/1234/5678'
  };

  return new Promise((resolve, reject) => {
    request(app)
      .post('/')
      .type('application/x-www-form-urlencoded')
      .set('Accept', 'application/json')
      .send(listParams)
      .end(function(err, res) {
        if (err) return reject(err);
        resolve(res);
      });
  })
}

module.exports = {
  baseRequest: baseRequest,
  sendJoinRequest: sendJoinRequest,
  sendListRequest: sendListRequest
}
