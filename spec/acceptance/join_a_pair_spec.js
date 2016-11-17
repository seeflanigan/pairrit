const expect  = require('chai').expect;

const sendJoinRequest = require('../support/request').sendJoinRequest;
const sendListRequest = require('../support/request').sendListRequest;

const db              = require('../../lib/pairrit').db;

describe('POST with `join` command', () => {
  beforeEach(() => {
    db.run('truncate table pairs', () => {})
  });

  it('accepts content type and returns json', (done) => {
    sendJoinRequest('ABC', 'alfred')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `alfred` pair!');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('respects a channel name option', (done) => {
    sendJoinRequest('ABC', 'batman', 'batcave')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql('Welcome to the `batcave` pair!');

        done();
      })
      .catch((err) => {
        done(err);
      });
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
      .catch((err) => {
        done(err);
      });
  });


  it('implicitly removes you from a pair if you join another', (done) => {
    done();
  });
});
