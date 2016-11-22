class Command::Leave
  attr_reader :channel, :params, :user

  def initialize(params)
    @params = params
    @user = params['user']
    @channel = params['channel']
  end

  def process
    pair = user.leave(channel)

    if pair
      { text: "You have left the `#{pair.name}` pair." }
    else
      { text: 'You are not in a pair. Why not try `/pair join` to join one?' }
    end
  end
end
