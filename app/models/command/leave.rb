class Command::Leave
  attr_reader :params, :user

  def initialize(params)
    @params = params
    @user = params['user']
  end

  def process
    pair = user.leave(params['channel'])

    if pair
      { text: "You have left the `#{pair.name}` pair." }
    else
      { text: 'You are not in a pair. Why not try `/pair join` to join one?' }
    end
  end
end
