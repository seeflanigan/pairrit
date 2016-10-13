// testing dependencies
const expect = require('chai').expect;
const td     = require('testdouble');

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
    it('persists a pair to the passed in datastore',  function() {
      const newPair = {
        channel:      '#gotham',
        sha:          'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      };

      // stub our datastore connection
      var mockSaveDoc = td.function()

      const mockCollection = {
        saveDoc: mockSaveDoc
      };

      // call our method
      persistence.setPairs(newPair, mockCollection);

      // verify db was called as expected
      td.verify(mockSaveDoc(newPair, td.matchers.isA(Function)));
    });
  });

  describe('retrieving pairs' , function() {
    it('returns the result from the call to persistence',  function() {
      const mockPairs = [{
        channel:      '#gotham',
        hash:         'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      }, {
        channel:      '#gotham',
        hash:         '0123abcde',
        name:         'wayne-enterprises',
        participants: ['lucius', 'bruce']
      }, {
        channel:      '#gotham',
        hash:         '12345asdf',
        name:         'arkham',
        participants: ['amadeus', 'jeremiah', 'harleen']
      }];

      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        findDoc: mockFindDoc
      };

      // figure out how to make a where clause
      // to verify that participants is not null
      td.when(mockFindDoc(td.matchers.isA(Object))).
        thenReturn(mockPairs);

      // call our method
      var result = persistence.getPairs('gotham', mockCollection);

      expect(result).to.eql(mockPairs);

      // maybe move this to a separate test
      // to verify db was called as expected
      // (with the where clause)
      // and make the 'returns pairs'
      // test verify that we return whatever
      // comes back from the mocked out call
      // here

    });

    it('retreives pairs with participants scoped to a channel', function() {
      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        findDoc: mockFindDoc
      };

      // exercise our code under test
      persistence.getPairs('gotham', mockCollection);

      // verify our call to persistence binding
      // with expected attributes
      const scope = td.matchers.contains({
        channel: 'gotham'
      });

      td.verify(mockFindDoc(scope, td.matchers.isA(Function)));
    });

    it('only fetches pairs with participants', function() {
      // stub out our datastore connection
      var mockFindDoc = td.function()

      const mockCollection = {
        findDoc: mockFindDoc
      };

      // exercise code under test
      persistence.getPairs('gotham', mockCollection);

      // verify our call to persistence binding
      // with expected attributes
      const scope = td.matchers.contains({
        "participants <>": []
      });

      td.verify(mockFindDoc(scope, td.matchers.isA(Function)));
    });
  });
});

