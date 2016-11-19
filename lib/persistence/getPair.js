const Promise = require('bluebird');
const _ = require('lodash/fp');

module.exports = (key, db, trx) => {
  const collection = db('pairs');
  const query   = { hash: key };
  const options = { order: "created_at desc", limit: 1 };

  return new Promise((resolve, reject) => {
    collection.transacting(trx).forUpdate().select().where(query).orderBy('created_at', 'desc').limit(1)
      .then((result) => {
        resolve(_.first(result));
      });
  });
};
