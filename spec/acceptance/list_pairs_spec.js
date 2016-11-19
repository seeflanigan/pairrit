const expect  = require('chai').expect;

const sendJoinRequest = require('../support/request').sendJoinRequest;
const sendListRequest = require('../support/request').sendListRequest;

const app = require('../../lib/app');
const db  = require('../../lib/pairrit').db;

describe('Listing Pairs', () => {
  beforeEach(() => {
    db.run('truncate table pairs', () => {})
  });

  it('responds with a message if there are no pairs', (done) => {
    const expectedMessage = 'This channel has no pairs in progress. Begin one now using `/pair join`!';

    sendListRequest('ABC')
      .then((res) => {
        expect(res.statusCode).to.eql(200);
        expect(res.text).to.eql(expectedMessage);

        done();
      })
      .catch(done);
  });

  it('returns a pair with at least one participant', (done) => {
    sendJoinRequest('ABC', 'alfred')
      .then((res) => {
        return sendListRequest('ABC')
      })
      .then((res) => {
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

        expect(res.text).to.eql(JSON.stringify(expectedResponse));

        done();
      })
      .catch(done);
  });

  it('only returns the most recent copy of a pair', (done) => {
    sendJoinRequest('ABC', 'alfred', 'batcave')
      .then(() => {
        return sendJoinRequest('ABC', 'batwoman', 'batcave');
      })
      .then(() => {
        return sendJoinRequest('ABC', 'joker', 'arkham');
      })
      .then(() => {
        return sendJoinRequest('ABC', 'batman', 'batcave');
      })
      .then(() => {
        return sendJoinRequest('ABC', 'catwoman', 'arkham');
      })
      .then(() => {
        return sendListRequest('ABC')
      })
      .then((res) => {
        const expectedPairs = [
          {
            fallback: '',
            title: 'arkham (2 participants)',
            text: 'joker, catwoman'
          },
          {
            fallback: '',
            title: 'batcave (3 participants)',
            text: 'alfred, batwoman, batman'
          }
        ]

        const expectedResponse = {
          response_type: 'in_channel',
          text: 'The following pairs are in progress:',
          attachments: expectedPairs
        };

        expect(res.text).to.eql(JSON.stringify(expectedResponse));
        done();
      })
      .catch(done);
  });
});
