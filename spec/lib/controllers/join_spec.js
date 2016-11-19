const Promise = require('bluebird');
const expect  = require('chai').expect;
const td      = require('testdouble');

const base    = require ('../../support/request').baseRequest;

const pairrit = td.replace('../../../lib/pairrit');
const subject = require('../../../lib/controllers/join');

describe('Join Controller', function() {
  const mockResponse = {
    send: td.function()
  };
  let body;

  beforeEach(() => {
    body = Object.assign({}, base);
    body.channel_id = 'ABC';
  });

  it('defaults pairName to user_name', () => {
    body.user_name = 'alfred';
    body.text = 'join';

    td.when(pairrit.leaveAll('alfred', 'ABC')).thenReturn(Promise.resolve());
    td.when(pairrit.join('alfred', 'alfred', 'ABC')).thenReturn(Promise.resolve());
    td.when(mockResponse.send('Welcome to the `alfred` pair!'));

    subject({body: body}, mockResponse);

    td.verify(mockResponse.send('Welcome to the `alfred` pair!'));
  });

  it('passes the first argument provided to command as pairName', () => {
    body.user_name = 'alfred';
    body.text = 'join batcave';

    td.when(pairrit.leaveAll('alfred', 'ABC')).thenReturn(Promise.resolve());
    td.when(pairrit.join('alfred', 'batcave', 'ABC')).thenReturn(Promise.resolve());
    td.when(mockResponse.send('Welcome to the `batcave` pair!'));

    subject({body: body}, mockResponse);

    td.verify(mockResponse.send('Welcome to the `batcave` pair!'));
  });
});

