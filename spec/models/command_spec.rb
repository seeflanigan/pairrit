require 'rails_helper'

describe Command, type: :model do
  context 'with an invalid command' do
    it 'returns a helpful response' do
      response = {
        text: [
          "Sorry, I'm not familiar with the `/pair joi` command.",
          "Perhaps you meant to type `/pair join` instead?"
        ].join("\n")
      }

      result = Command.new({ 'text' => 'joi batcave' }).process

      expect(result).to eq response
    end
  end
end
