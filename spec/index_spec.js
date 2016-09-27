// it('generates a pair id (sha) when a pair is created', function() {
//   // expect(pair).to have a sha
//   // this is probably about validating that the state is stored
//   // under the correct hash key in the 'pairs' state collection
// });
// 
// it('passes the user name as the pair name if no pair name is given', function(){
// })
// 
// it('passes the current state of the pair if one is found', function() {
// }
// 
// it('passes undefined for pairState if no pair is found', function() {
// })
// 
// it('ends a pair when the last person leaves', function() {
//   // removes it from the current state collection
// });
// 
// 
//     it('lists pairs if any are in progress', function() {
//       // pairrit.list()
//       // read application state
//       // expect('/pair join').to be_a_thing
//     });
// 
const router = require('../lib/index');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('router', function () {
    context('help command', () => {
        it('should respond to help command', () => {
            const mockReq = {
                query: {
                    text: 'help',
                    user_name: 'some user'
                }
            };
            const mockRes = {
                send: sinon.mock()
            };
            const expectedMessage = {
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
            mockRes.send.once().withArgs(expectedMessage);

            router(mockReq, mockRes);
        });
    });

    context('join command', () => {
        it('should take in a pair name', () => {
            const mockReq = {
                query: {
                    text: 'join pair-name',
                    user_name: 'some user',
                    channel_id: '1'
                }
            };
            const mockRes = {
                send: sinon.mock()
            };
            const expectedMessage = 'You have joined the `pair-name` pair.';
            mockRes.send.once().withArgs(expectedMessage);

            router(mockReq, mockRes);
        });
        it('should default the pair name to the user name if not provided', () => {
            const mockReq = {
                query: {
                    text: 'join',
                    user_name: 'some user',
                    channel_id: '1'
                }
            };
            const mockRes = {
                send: sinon.mock()
            };
            const expectedMessage = 'You have joined the `some user` pair.';
            mockRes.send.once().withArgs(expectedMessage);

            router(mockReq, mockRes);
        });
    });

    context('leave command', () => {
        it('should respond to leave command');
    });

    context('list command', () => {
        it('should respond to list command');
    });

    context('default command', () => {
        it('should default to default message');
    });
});