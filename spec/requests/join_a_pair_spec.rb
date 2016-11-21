require 'rails_helper'

RSpec.describe 'Join a pair', type: :request do
  it 'joins a pair' do
    expected = { text: 'Welcome to the `batcave` pair!' }.to_json

    send_request(command: 'join batcave')

    expect(response.content_type).to eq 'application/json'
    expect(response.body).to eq expected
  end
end
