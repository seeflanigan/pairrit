// testing dependencies
const expect  = require('chai').expect;
const td      = require('testdouble');
const Promise = require('bluebird');

// our system under test
const persistence = require('../../lib/persistence');

//
// WE ALWAYS MOVE FORWARD IN TIME
// creating history as we go
// all that we care about
// is that a copy of the most recent state
// of a pair is available
// we use the most recent available copy
// to make a new copy with our state change
// we persist this new copy
// and the previous state remains intact
// immutable over time
//
// GET ALL THE PAIRS
// (for a given channel)
// where Participants is not empty
//
// we only care about pairs with participants
// because when the last person leaves
// we store the last copy of that pair with empty
// participants
// and as soon as someone joins
// we make and store a new copy
// with the creator as the only participant
//

describe('Persistence', function() {
  describe('adding a pair to history' , function() {
    it('persists a pair to the passed in datastore',  function(done) {
      const newPair = {
        channel_id:   '#gotham',
        sha:          'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      };

      // stub our datastore connection
      var mockSaveDoc = td.function()

      const mockCollection = {
        save: mockSaveDoc
      };

      td.when(mockSaveDoc(newPair))
        .thenCallback(null, null);

      // call our method
      persistence.setPair(newPair, mockCollection)
        .then(() => {
          td.verify(mockSaveDoc(newPair, td.matchers.isA(Function)));
          done();
        })
        .catch(done);
    });
  });

  describe('retrieving pairs' , function() {
    it('returns the result from the call to persistence',  function(done) {
      const mockPairs = [{
        channel_id:   '#gotham',
        hash:         'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      }, {
        channel_id:   '#gotham',
        hash:         '0123abcde',
        name:         'wayne-enterprises',
        participants: ['lucius', 'bruce']
      }, {
        channel_id:   '#gotham',
        hash:         '12345asdf',
        name:         'arkham',
        participants: ['amadeus', 'jeremiah', 'harleen']
      }];

      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        find: mockFindDoc
      };

      // figure out how to make a where clause
      // to verify that participants is not null
      td.when(mockFindDoc(td.matchers.isA(Object), td.matchers.isA(Object), td.callback)).
        thenCallback(null, mockPairs);

      // call our method
      var result = persistence.getPairs('gotham', mockCollection)
        .then((result) => {
          expect(result).to.eql(mockPairs);
          done();
        })
        .catch(done);

      // maybe move this to a separate test
      // to verify db was called as expected
      // (with the where clause)
      // and make the 'returns pairs'
      // test verify that we return whatever
      // comes back from the mocked out call
      // here

    });

    it('retreives pairs with participants scoped to a channel', function(done) {
      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        find: mockFindDoc
      };

      td.when(mockFindDoc(td.matchers.isA(Object), td.matchers.isA(Object), td.callback)).
        thenCallback(null, null);

      // exercise our code under test
      persistence.getPairs('gotham', mockCollection)
        .then(() => {
          const scope = {
            channel_id: 'gotham'
          };

          td.verify(mockFindDoc(scope, td.matchers.isA(Object), td.matchers.isA(Function)));
          done();
        })
        .catch(done)
    });

    it('only fetches pairs with participants', function(done) {
      const mockPairs = [{
        channel_id:   '#gotham',
        hash:         'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      }, {
        channel_id:   '#gotham',
        hash:         '0123abcde',
        name:         'wayne-enterprises',
        participants: []
      }, {
        channel_id:   '#gotham',
        hash:         '12345asdf',
        name:         'arkham',
        participants: ['amadeus', 'jeremiah', 'harleen']
      }];

      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        find: mockFindDoc
      };

      // figure out how to make a where clause
      // to verify that participants is not null
      td.when(mockFindDoc(td.matchers.isA(Object), td.matchers.isA(Object), td.callback)).
        thenCallback(null, mockPairs);

      // exercise code under test
      persistence.getPairs('#gotham', mockCollection)
        .then((pairs) => {
          expect(pairs.length).to.eql(2);
          done();
        })
        .catch(done);
    });
  });
});

