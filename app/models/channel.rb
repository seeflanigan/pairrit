class Channel < ApplicationRecord
  belongs_to :team

  has_many :pairs
  has_many :users, through: :pairs

  def self.fetch(params)
    Channel.find_or_create_by(team: params['team'], slack_id: params['channel_id']) do |channel|
      channel.name = params['channel_name']
    end
  end

  def active_pairs
    pairs.includes(:users).where.not(users: { id: nil })
  end
end
