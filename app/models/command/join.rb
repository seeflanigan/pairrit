class Command::Join
  attr_reader :channel, :params, :user

  def initialize(params)
    @params = params
    @channel = params['channel']
    @user = params['user']
  end

  def process
    ActiveRecord::Base.transaction do
      pair = Pair.fetch(params)
      user.leave(channel)
      pair.add(user)

      { text: "Welcome to the `#{pair.name}` pair!" }
    end
  end
end
