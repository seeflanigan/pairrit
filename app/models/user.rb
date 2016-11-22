class User < ApplicationRecord
  belongs_to :team

  has_many :pairs, through: :pairs_users
  has_many :pairs_users

  def self.fetch(params)
    User.find_or_create_by(team: params['team'], slack_id: params['user_id']) do |user|
      user.name = params['user_name']
    end
  end

  def find_pair(channel)
    pairs.find_by(channel: channel)
  end

  def leave(channel)
    pair = find_pair(channel)

    if pair
      pair.remove(self)
      pair
    end
  end
end
