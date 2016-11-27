require 'httparty'

class SlackController < ApplicationController
  def create
    result = Slack.new(params['code']).verify

    pp result

    render json: {}
  end

  def handle
    render json: Command.new(params).process
  end
end
