const Promise = require('bluebird');
const _ = require('lodash/fp')

module.exports = function(channelId, db) {
  const collection = db('pairs');
  return new Promise((resolve, reject) => {
    collection.select().where('channel_id', channelId).orderBy('created_at', 'desc')
      .then((result) => {
        resolve(_.filter((pair) => {
          return pair.participants.length > 0
        }, _.uniqBy('hash')(result)));
      });
  })
};
