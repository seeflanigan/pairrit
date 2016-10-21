module.exports = function(pair, collection) {
  collection.saveDoc(pair, function(err, result) {
    // no-op
    return null;
  });

  return null;
};

