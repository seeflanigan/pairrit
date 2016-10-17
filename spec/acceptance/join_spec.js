const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

describe('POST /join', () => {
  var server;

  beforeEach(function () {
    delete require.cache[require.resolve('./server')];
    server = require('../../server');
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('accepts content type and returns json', function(done) {
    request(server)
      .post('/join')
      .expect(200, done);
      // .set('Accept', 'application/json')
      // .set('Content-Type', 'application/x-www-form-urlencoded')
      // .end(function(err, res) {
      //   if (err) return done(err);
      //   done();
      // });
  });

  // it('correctly handles complete params', function(done) {
  //   request(server)
  //     .post('/join')
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .expect(200)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       done();
  //     });
  // });
});
