const Promise = require('bluebird');

module.exports = function(pair, collection) {
  return new Promise((resolve, reject) => {
    collection.saveDoc(pair, function(err, result) {
      resolve();
    });
  })
};

