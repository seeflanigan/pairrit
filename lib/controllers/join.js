const _ = require('lodash');
const join = require('../pairrit').join;

const pairName = (params) => {
  const name =  _.split(params.body.text, ' ')[1];

  return _.first(_.compact([name, params.body.user_name]));
};

module.exports = (params) => {
  console.log(params)
};

