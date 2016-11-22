class Pair < ApplicationRecord
  belongs_to :channel

  has_many :events
  has_many :pairs_users
  has_many :users, through: :pairs_users

  has_one :team, through: :channel

  def self.fetch(params)
    name = params['user_name']

    if params['args']
      name = params['args'].first
    end

    Pair.order('created_at DESC').lock(true).find_or_create_by(channel: params['channel'], name: name)
  end

  def add(user)
    users.push(user)
    events.create(action: :join, user: user)
  end

  def remove(user)
    users.delete(user)
    events.create(action: :leave, user: user)
  end

  def user_names
    users.pluck(:name)
  end
end
