class Command::Leave
  attr_reader :params, :user

  def initialize(params)
    @params = params
    @user = params['user']
  end

  def process
    if user.has_pair?(params['channel'])
      pair = user.leave!(params['channel'])

      { text: "You have left the `#{pair.name}` pair." }
    else
      { text: 'You are not in a pair. Why not try `/pair join` to join one?' }
    end
  end
end
