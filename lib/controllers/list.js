const _          = require('lodash/fp');
const listsPairs = require('../pairrit').list;

module.exports = (req, res) => {
  const channelId = req.body.channel_id;

  listsPairs(channelId, res);
};

