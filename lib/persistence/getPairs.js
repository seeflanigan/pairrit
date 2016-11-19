const _ = require('lodash/fp')

module.exports = function(channelId, collection) {
  const query = {
    channel_id: channelId
  };

  return new Promise((resolve, reject) => {
    collection.find(query, {order: 'created_at DESC'}, (err, pairs) => {
      let uniqPairs = _.uniqBy('hash')(pairs);

      resolve(_.filter((pair) => {
        return pair.participants.length > 0
      }, uniqPairs));
    });
  });
};
