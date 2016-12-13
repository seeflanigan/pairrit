class Command::Join < Command::Base
  attr_reader :channel, :params, :user

  def initialize(params)
    @params = params
    @channel = params['channel']
    @user = params['user']
  end

  def process
    user.leave(channel)

    pair = Pair.find_or_create_by(channel: channel, name: pair_name)
    pair.add(user)

    { text: "Welcome to the `#{pair.name}` pair!" }
  end

  private

  def pair_name
    name = params['user_name']

    if params['args'].any?
      name = params['args'].first
    end

    name
  end
end
