class CommandHandler
  include ActionView::Helpers::TextHelper

  attr_reader :command, :name, :params

  def initialize(params)
    @command, @name = parse_command(params['text'])
    @params = params
  end

  def process
    send(command)
  end

  def join
    leave

    pair = Pair.clone_or_initialize_by(channel_id: params['channel_id'], name: pair_or_user_name)

    pair.channel_name = params['channel_name']
    pair.team_id = params['team_id']
    pair.team_domain = params['team_domain']
    pair.participants << params['user_name']

    pair.save

    { text: "Welcome to the `#{pair_or_user_name}` pair!" }
  end

  def leave
    pair = Pair.order('created_at DESC').find_by('? = ANY (participants)', params['user_name'])

    if pair
      pair = pair.dup
      pair.participants.delete(params['user_name'])
      pair.save

      { text: "You have left the `#{pair.name}` pair!" }
    else
      { text: 'You are not in a pair. Why not try `/pair join` to join one?' }
    end
  end

  def list
    pairs = Pair.where(channel_id: params['channel_id'])
      .order('created_at DESC')
      .select { |x| x.participants.any? }
      .uniq { |x| [x.channel_id, x.name] }

    if pairs.any?
      message = {
        response_type: 'in_channel',
        text: 'The following pairs are in progress:',
        attachments: pairs.map do |pair|
          {
            fallback: '',
            title: "#{pair.name} (#{pluralize(pair.participants.size, 'participant')})",
            text: pair.participants.join(', ')
          }
        end
      }
    else
      { text: 'There are no pairs in progress. Why not `/pair join` and start one?' }
    end
  end

  private

  def pair_or_user_name
    @name ||= params['user_name']
  end

  def parse_command(text)
    text.split(' ')
  end
end
