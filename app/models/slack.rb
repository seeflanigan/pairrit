class Slack
  SLACK_URL = 'https://slack.com/api/oauth.access'

  def initialize(code)
    @code = code
  end

  def verify
    result = HTTParty.get(slack_url, params).parsed_response

    if result['ok']
      result
    else
      string = <<~ERR
        Unable to verify Slack token.
        Expected `ok` to be `true`, but was `false`.

        Error: #{result['error']}
      ERR
      raise string
    end
  end

  private

  def params
    {
      query: {
        client_id: ENV['SLACK_CLIENT_ID'],
        client_secret: ENV['SLACK_CLIENT_SECRET'],
        code: @code,
        redirect_uri: ENV['SLACK_REDIRECT_URI']
      }
    }
  end

  def slack_url
    SLACK_URL
  end
end
