const _ = require('lodash');

const controllers = {
  help:  '', // require 'controllers/help',
  join:  require('./controllers/join'),
  leave: '', // require 'controllers/leave',
  list:  ''  // require 'controllers/list'
};

//  const args = req.query.text.split(' ');
//
//  req.options = {
//    command: args[0],
//    pairName: args[1] || req.query.user_name,
//    pairChannel: req.query.channel_id,
//    userName: req.query.user_name
//  };
//
//  console.log(`Received command from ${req.options.userName}: /pair ${args.join(' ')}`)
//
//  if (commands[req.options.command]) {
//    return commands[req.options.command](req, res);
//  }
//  return commands.default(req, res);
//};
//
//module.exports = router;

  // DESIGN CONSIDERATIONS:
  //
  // how do we get the other params into options?
  // should we just pass params through after all?
  // (eg to the controller)
  // something has to parse out the stuff we want
  // and pass the correct args to the command
  // but this can happen at the controller level
  // where the controller can select defaults
  // or the underlying libs can select defaults
  // join, leave, and list all care about channel_id, user_name
  // and possibly a higher-level unique namespace
  // (eg domain/team_id) - these all should be part of the hash

  //
  // call the command and pass in the options
  // we aren't currently doing anything with the channel_id
  // but we should probably store that on the pair
  // and make that part of the hash
  //

const command = (text) => {
  return _.first(_.split(text, ' '));
};

module.exports = (req, res) => {
  const result = controllers[command(req.body.text)](req, res);
};

