const _         = require('lodash/fp');
const pluralize = require('pluralize');
const SHA256    = require('crypto-js/sha256');
const Promise   = require('bluebird');

// database and state management deps
const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/pairrit';
const db               = require('knex')({ client: 'pg', connection: connectionString });

// helper functions to manage state
// maybe getPair should bind to the pairsCollection
const getPair  = require('./persistence').getPair;
const getPairs = require('./persistence').getPairs;
const getPairForUser = require('./persistence').getPairForUser;
const setPair  = require('./persistence').setPair;

function generateKey(pairChannel, pairName) {
  return '' + SHA256(`${pairChannel}-${pairName}`);
};

const addUserToPair = (userName, pairName, channelId) => {
  return new Promise((resolve, reject) => {
    const pairKey     = generateKey(channelId, pairName);

    const immutableValues = {
      channel_id:   channelId,
      hash:         pairKey,
      name:         pairName,
      participants: []
    }

    db.transaction((trx) => {
      getPair(pairKey, db, trx)
        .then((dataBasePair) => {
          const currentPair     = _.assign(immutableValues, dataBasePair)
          const newParticipants = new Set([...currentPair.participants, userName]);
          const newPair         = _.extend(_.omit(['id', 'created_at'])(currentPair), {participants: [...newParticipants]});

          return setPair(newPair, db, trx);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => resolve(true));
  })
};

const noPairsMessage = () => {
  const lines = [
    'This channel has no pairs in progress.',
    'Begin one now using `/pair join`!'
  ];

  return _.join(' ', lines);
};

const listsPairsInChannel = (channelId, res) => {
  getPairs(channelId, db)
    .then((activePairs) => {
      if(_.isEmpty(activePairs)) {
        res.send(noPairsMessage());
      } else {
        const message = {
          response_type: 'in_channel',
          text: 'The following pairs are in progress:',
          attachments: [] };

        activePairs.forEach((pair) => {
          const participantsCount = pair.participants.length;

          message.attachments.push({
            fallback: '',
            title: `${pair.name} (${participantsCount} ${pluralize('participant', participantsCount)})`,
            text: _.join(', ', pair.participants)
          })
        });

        res.send(message);
      }
    })
};

const leavePairsForUser = (user, channelId) => {
  return new Promise((resolve, reject) => {
    getPairForUser(user, db)
      .then((pair) => {
        if (_.isEmpty(pair)) {
          return resolve();
        }

        const newParticipants = _.without(pair.participants, user);
        const newPair         = _.extend(_.omit(['id', 'created_at'])(pair), {participants: [...newParticipants]});

        return setPair(newPair, db);
      })
      .then(resolve);
  })
};

module.exports = {
  join:    addUserToPair,
  list:    listsPairsInChannel,
  leaveAll: leavePairsForUser,
  db: db
};
