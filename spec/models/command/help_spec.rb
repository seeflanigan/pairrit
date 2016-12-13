require 'spec_helper'

class Command::Test < Command::Base
end

describe Command::Help, type: :model do
  subject { Command::Help.new({}) }

  it 'returns the list of commands' do
    expected = {
      fallback: '',
      title: '/pair test',
      text: 'No help available for this command.'
    }

    Command.add('test', Command::Test)

    result = subject.process

    expect(result[:text]).to eq 'The following commands are available:'
    expect(result[:attachments]).to include expected
  end
end
