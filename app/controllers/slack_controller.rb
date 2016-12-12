require 'httparty'

class SlackController < ApplicationController
#{"ok"=>true,
# "access_token"=>
#  "xoxp-12460568371-12462919158-110074413927-565cc3f8d16a348450354ce3ac331fe4",
# "scope"=>"identify,commands",
# "team_name"=>"Personal",
# "team_id"=>"T0CDJGQAX"}
  def create
    result = Slack.new(params['code']).verify

    render json: { ok: true }
  end

  def handle
    render json: Command.new(params).process
  end
end
