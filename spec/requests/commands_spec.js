const expect  = require("chai").expect;
const post    = require("superagent").post;
const server  = require("../../server");

const BASE_URL = "http://localhost";

const httpPort = function () {
  return process.env.HTTP_PORT || 3000
}();

describe("Pairrit Server", function() {
  beforeEach(function(done) {
    server.listen(httpPort, function(err) {
      done(err);
    });
  });

  afterEach(function(done) {
    server.close(function(err) {
      done(err);
    });
  });

  describe("POST /commands", function() {
    it("returns status 200", function(done) {

      post('/commands', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });

    });
  });
});
