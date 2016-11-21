const _ = require('lodash');
const leave = require('../pairrit').leave;

module.exports = (req, res) => {
  const userName  = req.body.user_name;
  const channelId = req.body.channel_id;

  leave(userName, channelId)
    .then((pairName) => {
      if (_.isUndefined(pairName)) {
        res.send('You are not currently in a pair. Use `/pair join` to join one!');
      } else {
        res.send(`You have left the \`${pairName}\` pair.`);
      }
    });
};

