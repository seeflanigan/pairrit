const express = require('express');
const app = express();
const pairrit = require('./pairrit');
const pluralize = require('pluralize');

let state = {}

const commands = {
  help: function(req, res) {
    const message = {
      text: 'The following commands are available:',
      attachments: [
        {
          fallback: '',
          color: '#439FE0',
          title: '/pair list',
          text: 'Lists all the pairs for the current channel.'
        },
        {
          fallback: '',
          color: 'good',
          title: '/pair join [name]',
          text: 'Joins the pair with the given name, or joins a pair named after the user if a name was not provided.'
        },
        {
          fallback: '',
          color: 'danger',
          title: '/pair leave [name]',
          text: 'Leaves the pair with the given name, or leaves the pair named after the user if a name was not provided.'
        },
        {
          fallback: '',
          color: '#439FE0',
          title: '/pair help',
          text: 'Displays this help message.'
        }
      ]
    }

    res.send(message);
  },

  join: function(req, res) {
    state = pairrit.update(state, req.options);

    res.send(`You have joined the \`${req.options.pairName}\` pair.`);
  },

  leave: function(req, res) {
    state = pairrit.update(state, req.options);

    res.send(`You have left the \`${req.options.pairName}\` pair.`);
  },

  list: function(req, res) {
    {
      const pairs = pairrit.list(state, req.options.pairChannel);

      if (pairs.length > 0) {
        const message = { text: 'The following pairs were found:', attachments: [] };

        pairs.forEach((pair) => {
          const members = Array.from(pair.participants);
          const memberCount = members.length;

          message.attachments.push({
            fallback: '',
            title: `${pair.name} (${memberCount} ${pluralize('member', memberCount)})`,
            text: members.join(', ')
          })
        });

        res.send(message);
      } else {
        res.send('No pairs were found in this channel.');
      }
    }
  },

  default: function(req, res) {
    res.send(`The provided command (\`/pair ${command}\`) was not recognized.\nPerhaps try \`/pair help\` for a list of valid commands.`);
  }
};

const router = function router(req, res) {
  const args = req.query.text.split(' ');
  req.options = {
    command: args[0],
    pairName: args[1] || req.query.user_name,
    pairChannel: req.query.channel_id,
    userName: req.query.user_name
  };

  console.log(`Received command from ${req.options.userName}: /pair ${args.join(' ')}`)

  if (commands[req.options.command]) {
    return commands[req.options.command](req, res);
  }
  return commands.default(req, res);
};

module.exports = router;

