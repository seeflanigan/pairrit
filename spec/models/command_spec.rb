require 'spec_helper'
require './app/models/command'

describe Command, type: :model do
  context 'with an invalid command' do
    it 'returns a helpful response' do
      Command.add('join', '')

      response = {
        text: [
          "Sorry, I'm not familiar with the `joi` command.",
          "Perhaps you meant to type `join` instead?"
        ].join("\n")
      }

      result = Command.new({ 'text' => 'joi batcave' }).process

      expect(result).to eq response
    end
  end
end
