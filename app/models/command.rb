require 'levenshtein'

class Command
  def self.add(command, handler)
    commands[command] = handler
  end

  def self.get(command)
    commands[command]
  end

  def self.commands
    @commands ||= {}
  end

  attr_reader :command, :params

  def initialize(params)
    @params = params
    @command, @params['args'] = parse_command(params['text'])
  end

  def process
    handler = self.class.get(command)

    if handler
      params['team'] = Team.fetch(params)
      params['channel'] = Channel.fetch(params)
      params['user'] = User.fetch(params)

      handler.new(params).process
    else
      text = [
        "Sorry, I'm not familiar with the `/pair #{command}` command.",
        "Perhaps you meant to type `/pair #{get_best_guess}` instead?"
      ]

      { text: text.join("\n") }
    end
  end

  private

  def get_best_guess
    self.class.commands.keys.min_by { |cmd, _| Levenshtein.distance(command, cmd) }
  end

  def parse_command(text)
    command, *args = text.split(' ')
    [command.downcase, args]
  end
end
