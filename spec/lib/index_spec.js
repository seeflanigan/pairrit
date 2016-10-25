const router = require('../../lib/index');
const expect = require('chai').expect;
const sinon = require('sinon');
const td = require('testdouble');

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
        it('requires a user_name and channel_id', () => {
          const mockReq = {
            query: {
              text: 'join',
              user_name: 'batman',
              channel_id: '1'

            }
          };

          const mockSend = td.function();

          const mockRes = {
              send: mockSend
          };

          const expectedMessage = 'You have joined the `batman` pair.';

          router(mockReq, mockRes);

          td.verify(mockSend(expectedMessage));
        });

        it('accepts an optional pair name', () => {
          const mockReq = {
            query: {
              text: 'join batcave',
              user_name: 'batman',
              channel_id: '1'
            }
          };

          const mockSend = td.function();

          const mockRes = {
              send: mockSend
          };

          const expectedMessage = 'You have joined the `batcave` pair.';

            mockRes.send.once().withArgs(expectedMessage);

            router(mockReq, mockRes);
        });
    });

    context('leave command', () => {
        it('requires a user_name and channel_id', () => {
          const mockReq = {
            query: {
              text: 'join',
              user_name: 'batman',
              channel_id: '1'

            }
          };

          const mockSend = td.function();

          const mockRes = {
              send: mockSend
          };

          const expectedMessage = 'You have left the `batman` pair.';

          router(mockReq, mockRes);

          td.verify(mockSend(expectedMessage));
        });

      it('removes the user from their current pair in the given channel', () => {
      });

      it('provides a no-op message when the User is not in a channel', () => {
      });
      // commands can all share a common responder which accepts and returns
      // a `message` (whatever the response body/text is from the command
    });

    context('list command', () => {
      it('requires a channel_id and returns a formatted list of pairs in that channel', () => {
          const mockReq = {
            query: {
              text: 'list',
              channel_id: '1'

            }
          };

          const mockSend = td.function();

          const mockRes = {
              send: mockSend
          };

          const expectedMessage = 'You have joined the `batman` pair.';

          router(mockReq, mockRes);

          td.verify(mockSend(expectedMessage));
      });

      it('should respond to list command');
    });

    context('default command', () => {
      it('should default to default message');
    });
});

