const _ = require('lodash/fp');

module.exports = (key, collection) => {
  const query   = { hash: key };
  const options = { order: "created_at desc", limit: 1 };

  return collection.findDoc(query, options, (err, result) => {
    const pair = _.first(_.flatten(_.compact([err, result])));

    console.dir("DATABASE ERROR (in findDoc): ");
    console.dir(err, {colors: true, depth: 10});
    console.dir("******************************");
    console.dir("DATABASE RESULT (in findDoc): ");
    console.dir(pair, {colors: true, depth: 10});
    console.dir("******************************");

    return pair;
  });
};
