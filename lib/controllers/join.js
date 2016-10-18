const _ = require('lodash');
const join = require('../pairrit').join;

const pairName = (text) => {
  const name =  _.split(text, ' ')[1];

  return _.first(_.compact([name, params.user_name]));
};

module.exports = (params) => {
  console.log(params)

  // set headers and such
  // determine a solution to managing duplication in headers

  res.send(JSON.stringify(result));
};

