class Pair < ApplicationRecord
  belongs_to :channel

  has_many :events
  has_many :pairs_users
  has_many :users, through: :pairs_users

  has_one :team, through: :channel

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
