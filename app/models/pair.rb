class Pair < ApplicationRecord
  def self.fetch(params)
    name = params['arg'] || params['user_name']
    pair = Pair.order('created_at DESC').lock(true).find_or_initialize_by(channel_id: params['channel_id'], name: name) do |pair|
      pair.channel_name = params['channel_name']
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

  def users
    User.where(id: self.participants)
  end

  def user_names
    users.pluck(:name)
  end
end
