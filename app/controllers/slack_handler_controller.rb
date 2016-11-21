class SlackHandlerController < ApplicationController
  def index
    render json: Command.new(params).process
  end
end
