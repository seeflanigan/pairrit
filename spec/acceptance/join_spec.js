const expect  = require('chai').expect;
const request = require('supertest');
const td      = require('testdouble');

const app = require('../../lib/app');

describe('POST with `join` command', () => {
  it('accepts content type and returns json', function(done) {
    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.eql('Welcome to the `batman` pair');
        done();
       });
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
