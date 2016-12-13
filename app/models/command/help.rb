class Command::Help < Command::Base
  def initialize(params)
  end

  def process
    {
      text: 'The following commands are available:',
      attachments: Command.commands.map do |_, command|
        command = command.new({})
        {
          fallback: '',
          title: command.usage,
          text: command.description
        }
      end
    }
  end
end
