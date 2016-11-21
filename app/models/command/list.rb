class Command::List
  include ActionView::Helpers::TextHelper

  attr_reader :params

  def initialize(params)
    @params = params
  end

  def process
    pairs = Pair.where(channel_id: params['channel_id'])
      .order('created_at DESC')
      .to_a
      .uniq { |x| x.name }
      .select { |x| x.participants.any? }

    if pairs.any?
      message = {
        response_type: 'in_channel',
        text: 'The following pairs are in progress:',
        attachments: pairs.map do |pair|
          {
            fallback: '',
            title: "#{pair.name} (#{pluralize(pair.participants.size, 'participant')})",
            text: pair.user_names.join(', ')
          }
        end
      }
    else
      { text: 'There are no pairs in progress. Why not `/pair join` and start one?' }
    end
  end
end
