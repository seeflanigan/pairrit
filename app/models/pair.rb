class Pair < ApplicationRecord
  belongs_to :channel

  has_many :users, through: :pairs_users
  has_many :pairs_users

  def self.fetch(params)
    name = params['arg'] || params['user_name']
    pair = Pair.order('created_at DESC').lock(true).find_or_initialize_by(channel: params['channel'], name: name) do |pair|
    end

    if pair.id?
      pair.dup
    else
      pair
    end
  end

  def add(id)
    participants.push(id)
    save
  end

  def remove(id)
    participants.delete(id)
    save
  end

  def user_names
    users.pluck(:name)
  end
end
