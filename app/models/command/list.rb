class Command::List
  include ActionView::Helpers::TextHelper

  attr_reader :channel, :params

  def initialize(params)
    @channel = params['channel']
    @params = params
  end

  def process
    pairs = channel.active_pairs.to_a.uniq { |x| x.name }

    if pairs.any?
      message = {
        response_type: 'ephemeral',
        text: 'The following pairs are in progress:',
        attachments: pairs.map do |pair|
          {
            fallback: '',
            title: "#{pair.name} (#{pluralize(pair.users.size, 'participant')})",
            text: pair.user_names.join(', ')
          }
        end
      }
    else
      { text: 'There are no pairs in progress. Why not `/pair join` and start one?' }
    end
  end
end
