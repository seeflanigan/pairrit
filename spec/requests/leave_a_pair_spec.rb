require 'rails_helper'

RSpec.describe 'Leave a pair', type: :request do
  it 'leaves a pair' do
    team = Team.create(domain: 'justice', slack_id: 'DEF')
    channel = Channel.create(name: 'gotham', team: team, slack_id: 'ABC')
    user = User.create(name: 'batman', slack_id: 'XYZ', team: team)
    pair = Pair.create(channel: channel, name: 'batcave', participants: [user.id])
    pair.users << user

    send_request(command: 'leave')

    expected = { text: 'You have left the `batcave` pair.' }.to_json

    expect(response.content_type).to eq 'application/json'
    expect(response.body).to eq expected
  end
end
