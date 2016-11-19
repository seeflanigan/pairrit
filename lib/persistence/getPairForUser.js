const Promise = require('bluebird');
const _ = require('lodash/fp');

module.exports = (user, collection) => {
  const query   = { 'participants @>': [user] };
  const options = { order: 'created_at desc', limit: 1 };

  return new Promise((resolve, reject) => {
    collection.find(query, options, (err, result) => {
      const pair = _.first(_.flatten(_.compact([err, result])));

      resolve(pair);
    });
  });
};
