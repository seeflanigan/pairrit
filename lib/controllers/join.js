const _    = require('lodash/fp');
const join = require('../pairrit').join;
const leave = require('../pairrit').leave;

const firstValueFrom = (array) => {
  return _.first(_.compact(array));
};

const derivePairNameFrom = ({text, user_name}) => {
  const name =  _.split(' ', text)[1];

  return firstValueFrom([name, user_name]);
};

module.exports = (req, res) => {
  const userName  = req.body.user_name;
  const pairName  = derivePairNameFrom(req.body);
  const channelId = req.body.channel_id;

  leave(userName, channelId)
    .then(() => {
      return join(userName, pairName, channelId);
    })
    .then(() => {
      res.send(`Welcome to the \`${pairName}\` pair!`);
    });
  // if we calculate the key sooner we can do
  // const result = join(userName, pairKey);

};

