class User < ApplicationRecord
  belongs_to :team
  belongs_to :pair, required: false

  def self.fetch(params)
    User.find_or_create_by(team: params['team'], slack_id: params['user_id']) do |user|
      user.name = params['user_name']
    end
  end

  def join!(params)
    leave! if pair

    new_pair = Pair.fetch(params)
    new_pair.add(id)

    pair if update(pair: new_pair)
  end

  def leave!
    new_pair = pair.dup
    new_pair.remove(id)

    new_pair if update(pair: nil)
  end
end
