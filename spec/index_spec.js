var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../lib/index');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /join', function testJoin(done) {
    request(server)
      .get('/join')
      .expect(200, done);
  });
});
