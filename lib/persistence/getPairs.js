const _ = require('lodash')

module.exports = function(channelId, collection) {
  const query = {
    channel_id: channelId
  };

  return new Promise((resolve, reject) => {
    collection.findDoc(query, {order: 'created_at DESC'}, (err, activePairs) => {
      resolve(_.filter(activePairs, (pair) => {
        return pair.participants.length > 0
      }));
    });
  });
};
