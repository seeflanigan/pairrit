describe('Pairrot', function() {
  describe('/pair join' , function() {
    it('creates a pair when the first person joins',  function() {
      Pairrot.join()
      // invoke side effects to modify application state
      expect('/pair join').to be_a_thing
    });

    it('generates a pair id when a pair is created', function() {
      // expect(pair).to have an id
    });

    it('updates a pair when someone leaves', function() {
    });

    it('ends a pair when the last person leaves', function() {
    });

// /pair join #pairrot
//
// events:
//
// user         #pair-id   action   time
// -----------------------------------------
// @adeschamps  #pairrot   join     12:00
// @jchambers   #pairrot   join     12:01
// @cflanigan   #pairrot   join     12:12

// if all state is immutable, and the current state is just a projection of state change over time
// how do we know and display the current state of the application
// if we are only showing events within 12 hours, we may have a user in a pair who joined > 12 ago, and has not left yet

// events while you were pairing: who is in the pair when you join
// if you're already in a pair, joining a different pair is an implicit leave (v1)
// if you're already in a pair, you see buttons "do you want to switch?" 

// * when do we stop showing a pair on the list (eg 12 hours with 0 users)

    it('lists pairs if any are in progress'  function() {
      Pairrot.list()
      // read application state
      expect('/pair join').to be_a_thing
    });
  });
});
