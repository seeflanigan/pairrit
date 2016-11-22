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
    @command = params['text'].split(' ').first
    @params = params
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
        "Sorry, I'm not familiar with the `#{command}` command.",
        "Perhaps you meant to type `#{get_best_guess}` instead?"
      ]

      { text: text.join("\n") }
    end
  end

  private

  def get_best_guess
    self.class.commands.keys.min_by { |cmd, _| Levenshtein.distance(command, cmd) }
  end

  def parse_command(text)
    command, arg = text.split(' ')
    [command.downcase, arg]
  end
end
