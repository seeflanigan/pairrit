const Promise = require('bluebird');

module.exports = function(pair, db, trx) {
  const collection = db('pairs');

  return collection.insert(pair).transacting(trx);
};

