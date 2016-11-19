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
  const db = td.function();
  const collection = {
    insert: td.function(),
    select: td.function(),
    where: td.function(),
    orderBy: td.function(),
    transacting: td.function()
  };

  beforeEach(() => {
    td.when(db('pairs')).thenReturn(collection);
  });

  afterEach(() => {
    td.reset();
  })

  describe('adding a pair to history' , function() {
    it('persists a pair to the passed in datastore',  function(done) {
      const newPair = {
        channel_id:   '#gotham',
        sha:          'asdf12345',
        name:         'batcave',
        participants: ['alfred', 'batman', 'you', 'me']
      };

      td.when(collection.insert(td.matchers.isA(Object))).thenReturn(collection);
      td.when(collection.transacting(td.matchers.anything())).thenResolve();

      // call our method
      persistence.setPair(newPair, db)
        .then(() => {
          td.verify(collection.insert(newPair));
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

      td.when(collection.select()).thenReturn(collection);
      td.when(collection.where('channel_id', 'gotham')).thenReturn(collection);
      td.when(collection.orderBy('created_at', 'desc')).thenResolve(mockPairs);

      // call our method
      var result = persistence.getPairs('gotham', db)
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
      td.when(collection.select()).thenReturn(collection);
      td.when(collection.where('channel_id', td.matchers.isA(String))).thenReturn(collection);
      td.when(collection.orderBy('created_at', 'desc')).thenResolve([]);

      persistence.getPairs('gotham', db)
        .then(() => {
          td.verify(collection.where('channel_id', 'gotham'));
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

      td.when(collection.select()).thenReturn(collection);
      td.when(collection.where('channel_id', '#gotham')).thenReturn(collection);
      td.when(collection.orderBy('created_at', 'desc')).thenResolve(mockPairs);

      // exercise code under test
      persistence.getPairs('#gotham', db)
        .then((pairs) => {
          expect(pairs.length).to.eql(2);
          done();
        })
        .catch(done);
    });
  });
});

