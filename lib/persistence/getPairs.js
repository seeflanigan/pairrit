module.exports = function(collection) {
  return collection.findDoc(function(err, result) {
    return _.first(_.compact([err, result]));
  });
};
