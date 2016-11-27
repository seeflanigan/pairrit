require 'spec_helper'
require 'httparty'
require_relative '../../app/models/slack'

describe Slack, type: :model do
  let(:json) { JSON.parse('{"ok":true}') }
  let(:response) { double('response') }

  before do
    allow(response).to receive(:parsed_response).and_return(json)
    allow(HTTParty).to receive(:get).and_return(response)
  end

  it 'returns a successful response' do
    result = Slack.new('test').verify

    expect(result['ok']).to eq true
  end

  context 'with an invalid response' do
    let(:json) { JSON.parse('{"ok":false,"error":"some_error_string"}') }

    it 'throws an error' do
      expect { Slack.new('test').verify }.to raise_error(/some_error_string/)
    end
  end
end
