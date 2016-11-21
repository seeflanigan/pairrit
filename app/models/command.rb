class Command
  def self.add(command, handler)
    @commands ||= {}
    @commands[command] = handler
  end

  def self.get(command)
    @commands[command]
  end

  attr_reader :arg, :command, :params

  def initialize(params)
    @command, @arg = parse_command(params['text'])
    @params = params

    params['arg'] = arg
  end

  def process
    handler = self.class.get(command)

    params['team'] = Team.fetch(params)
    params['user'] = User.fetch(params)

    if handler
      handler.new(params).process
    else
      { text: 'Sorry, I\'m not familiar with that command.' }
    end
  end

  private

  def parse_command(text)
    text.split(' ')
  end
end
