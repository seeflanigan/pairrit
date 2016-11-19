const leave = require('../pairrit').leave;

module.exports = (req, res) => {
  const userName  = req.body.user_name;
  const channelId = req.body.channel_id;

  leave(userName, channelId)
    .then((pairName) => {
      res.send(`You have left the \`${pairName}\` pair.`);
    });
};

