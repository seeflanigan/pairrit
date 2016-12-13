require 'rails_helper'

describe Command::Base, type: :model do
  subject { Command::Base.new }

  describe '#description' do
    it 'should return a default description' do
      expect(subject.description).to eq 'No help available for this command.'
    end
  end

  describe '#name' do
    it 'should return the command name' do
      expect(subject.name).to eq 'base'
    end
  end

  describe '#usage' do
    it 'should return the command usage' do
      expect(subject.usage).to eq '/pair base'
    end
  end
end
