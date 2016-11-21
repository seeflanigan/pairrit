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

  def has_pair?(channel)
    find_pair(channel).present?
  end

  def join!(params)
    leave!(params['channel']) if has_pair?(params['channel'])

    new_pair = Pair.fetch(params)
    new_pair.add(id)

    pairs << new_pair

    new_pair
  end

  def leave!(channel)
    pair = find_pair(channel)
    pair.users.delete(id)

    new_pair = pair.dup
    new_pair.remove(id)
    new_pair
  end
end
