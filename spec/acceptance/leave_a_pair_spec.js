const db               = require('../../lib/pairrit').db;
const expect           = require('chai').expect;
const sendLeaveRequest = require('../support/request').sendLeaveRequest;
const sendListRequest  = require('../support/request').sendListRequest;
const sendJoinRequest  = require('../support/request').sendJoinRequest;

describe('POST with `leave` command', () => {
  beforeEach(() => {
    db.raw('truncate table pairs').then(() => {})
  });

  it('removes you from a pair', (done) => {
    sendJoinRequest('ABC', 'alfred', 'batcave')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        return sendLeaveRequest('ABC', 'alfred');
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('You have left the `batcave` pair.');

        return sendListRequest('ABC');
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('This channel has no pairs in progress. Begin one now using `/pair join`!');

        done();
      })
      .catch(done);
  });
});
