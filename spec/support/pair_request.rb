module PairRequest
  def send_request(command:, opts: {})
    data = {
      channel_id: 'ABC',
      channel_name: 'gotham',
      command: '/pair',
      name: 'batcave',
      team_id: 'DEF',
      team_name: 'Justice League',
      user_id: 'XYZ',
      user_name: 'batman'
    }.merge(opts)

    data[:text] = command

    post '/', params: data
  end
end
