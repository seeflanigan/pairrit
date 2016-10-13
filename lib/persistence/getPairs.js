module.exports = function(channelName, collection) {
  const query = {
    channel: channelName,
    "participants <>": []
  };

  return collection.findDoc(query, function(err, result) {
    return _.first(_.compact([err, result]));
  });
};
