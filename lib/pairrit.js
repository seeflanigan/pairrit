function p(...toInspects) { 
  toInspects.forEach(function(toInspect) {
    console.dir(toInspect, {colors: true, depth: 10})
  })
}
const _         = require('lodash/fp');
const assign    = require('lodash/fp').assign;
const extend    = require('lodash/fp').extend;
const filter    = require('lodash/fp').filter;
const pluralize = require('pluralize');
const SHA256    = require('crypto-js/sha256');

// require commands
// const help   = require('./commands/help');
const join   = require('./commands/join');
const leave  = require('./commands/leave');
const list   = require('./commands/list');

// database and state management deps
const massive = require('massive');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/pairrit';
const pairsCollection  = new massive.connectSync({connectionString: connectionString}).pairs;

// helper functions to manage state
// maybe getPair should bind to the pairsCollection
const getPair   = require('./persistence').getPair;
const getPairs  = require('./persistence').getPairs;
const setPair   = require('./persistence').setPair;

function generateKey(pairChannel, pairName) {
  return '' + SHA256(`${pairChannel}-${pairName}`);
};

function updatePair(currentState, options) {
  const key       = generateKey(options.pairChannel, options.pairName);
  const pairState = lookupPair(currentState, key);

  const message   = options.command;
  const newOpts   = Object.assign({pairState: pairState}, options);

  const newPair = this[message](newOpts);

  const newPairState = {};

  if (newPair !== undefined) {
    newPairState[key] = newPair;
    return extend(newPairState, currentState);
  } else {
    delete currentState[key];
    return currentState;
  }
};

function listPairs(currentState, channel) {
  return filter(currentState, ['channel', channel]);
};

const addUserToPair = (userName, pairName, channelId) => {
  const pairKey     = generateKey(channelId, pairName);

  const immutableValues = {
    channel_id:   channelId,
    hash:         pairKey,
    name:         pairName,
    participants: []
  }

  const currentPair     = _.assign(immutableValues, getPair(pairKey, pairsCollection));
  const newParticipants = new Set([...currentPair.participants, userName]);
  const newPair         = _.extend(currentPair, {participants: [...newParticipants]});

  setPair(newPair, pairsCollection);

  // maybe return something different if an error happens
  return true;
};

module.exports = {
  //join:    require('./commands/join'),
  join:    addUserToPair,
  leave:   require('./commands/leave'),
  list:    require('./commands/list'),
  update:  updatePair,
  getPairs: getPairs,
  collection: pairsCollection
};

