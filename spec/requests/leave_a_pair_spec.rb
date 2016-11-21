require 'rails_helper'

RSpec.describe 'Leave a pair', type: :request do
  it 'leaves a pair' do
    team = Team.create(domain: 'justice', slack_id: 'DEF')
    user = User.create(name: 'batman', slack_id: 'XYZ', team: team)
    pair = Pair.create(channel_id: 'ABC', name: 'batcave', participants: [user.id])
    user.update(pair: pair)

    send_request(command: 'leave')

    expected = { text: 'You have left the `batcave` pair.' }.to_json

    expect(response.content_type).to eq 'application/json'
    expect(response.body).to eq expected
  end
end
