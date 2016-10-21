module.exports = function(key, collection) {
  return collection.findDoc({hash: key}, function(err, result) {
    return _.first(_.compact([err, result]));
  });
};
