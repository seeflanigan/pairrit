class Command::Join
  attr_reader :params, :user

  def initialize(params)
    @params = params
    @user = params['user']
  end

  def process
    ActiveRecord::Base.transaction do
      pair = user.join!(params)

      { text: "Welcome to the `#{pair.name}` pair!" }
    end
  end
end
