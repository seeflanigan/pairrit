const Promise = require('bluebird');
const _ = require('lodash/fp');

module.exports = (key, collection) => {
  const query   = { hash: key };
  const options = { order: "created_at desc", limit: 1 };

  return new Promise((resolve, reject) => {
    collection.findDoc(query, options, (err, result) => {
      const pair = _.first(_.flatten(_.compact([err, result])));

      resolve(pair);
    });
  });
};
