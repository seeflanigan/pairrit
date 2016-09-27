const router = require('../../lib/index');
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
