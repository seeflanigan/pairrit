// Birdhandler
// Birdkeeper
// Aviculturist
// RaptorHandler

const express = require('express');
const app = express();
const keeper = require('./birdkeeper');
const pluralize = require('pluralize');

let state = {}

app.get('/', function (req, res) {
  const args = req.query.text.split(' ');
  const command = args[0];
  const pairName = args[1] || req.query.user_name;
  const pairChannel = req.query.channel_id;
  const userName = req.query.user_name;

  console.log(`Received command from ${userName}: /pair ${args.join(' ')}`)

  switch (command) {
    case 'help':
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
      break;
    case 'join':
      state = keeper.update(state, { pairName: pairName, pairChannel: pairChannel, userName: userName, command: command });

      res.send(`You have joined the \`${pairName}\` pair.`);
      break;
    case 'leave':
      state = keeper.update(state, { pairName: pairName, pairChannel: pairChannel, userName: userName, command: command });

      res.send(`You have left the \`${pairName}\` pair.`);
      break;
    case 'list':
      {
        const pairs = keeper.list(state, pairChannel);

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
      break;
    default:
      res.send(`The provided command (\`/pair ${command}\`) was not recognized.\nPerhaps try \`/pair help\` for a list of valid commands.`);
      break;
  }
});

app.listen(1337, function () {
	console.log('App listening on port 1337');
});
