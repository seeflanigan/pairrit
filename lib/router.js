const _ = require('lodash');

const controllers = {
  join:  require('./controllers/join'),
  leave: require('./controllers/leave'),
  list:  require('./controllers/list')
};

const parseCommand = (text) => _.first(_.split(text, ' '));

module.exports = (req, res) => {
  const commandName = parseCommand(req.body.text);

  return controllers[commandName](req, res);
};

