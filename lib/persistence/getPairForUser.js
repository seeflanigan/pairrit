const Promise = require('bluebird');
const _ = require('lodash/fp');

module.exports = (user, db) => {
  const collection = db('pairs');

  return new Promise((resolve, reject) => {
    collection.select().whereRaw('? = ANY (participants)', user).orderBy('created_at', 'desc').limit(1)
      .then((result) => {
        resolve(_.first(result));
      });
  });
}
