const expect  = require('chai').expect;

const sendJoinRequest = require('../support/request').sendJoinRequest;
const sendListRequest = require('../support/request').sendListRequest;

const db              = require('../../lib/pairrit').db;

describe('POST with `join` command', () => {
  beforeEach(() => {
    db.raw('truncate table pairs').then(() => {})
  });

  it('accepts content type and returns json', (done) => {
    sendJoinRequest('ABC', 'alfred')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `alfred` pair!');

        done();
      })
      .catch(done);
  });

  it('respects a channel name option', (done) => {
    sendJoinRequest('ABC', 'batman', 'batcave')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        done();
      })
      .catch(done);
  });

  it('adds you to an existing pair', (done) => {
    sendJoinRequest('ABC', 'alfred', 'batcave')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        return sendJoinRequest('ABC', 'batman', 'batcave');
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        return sendListRequest('ABC');
      })
      .then((res) => {
        const expectedResponse = {
          "response_type": "in_channel",
          "text":          "The following pairs are in progress:",
          "attachments": [{
            "fallback": "",
            "title":    "batcave (2 participants)",
            "text":     "alfred, batman"
          }]
        };

        expect(res.statusCode).to.eql(200);
        expect(JSON.parse(res.text)).to.eql(expectedResponse);

        done();
      })
      .catch(done);
  });


  it('implicitly removes you from a pair if you join another', (done) => {
    sendJoinRequest('ABC', 'alfred', 'batcave')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        return sendJoinRequest('ABC', 'alfred', 'wayne-enterprises');
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `wayne-enterprises` pair!');
      })
      .then(() => {
        return sendListRequest('ABC');
      })
      .then((res) => {
        const expectedResponse = {
          "response_type": "in_channel",
          "text":          "The following pairs are in progress:",
          "attachments": [{
            "fallback": "",
            "title":    "wayne-enterprises (1 participant)",
            "text":     "alfred"
          }]
        };

        expect(res.statusCode).to.eql(200);
        expect(JSON.parse(res.text)).to.eql(expectedResponse);

        done();
      })
      .catch(done);
  });
});
