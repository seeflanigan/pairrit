require 'rails_helper'

RSpec.describe 'Leave a pair', type: :request do
  it 'leaves a pair' do
    Pair.create(channel_id: 'ABC', name: 'batcave', participants: ['batman'])

    send_request(command: 'leave')

    expected = { text: 'You have left the `batcave` pair!' }.to_json

    expect(response.content_type).to eq 'application/json'
    expect(response.body).to eq expected
  end
end
