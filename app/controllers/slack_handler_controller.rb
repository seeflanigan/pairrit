class SlackHandlerController < ApplicationController
  def index
    render json: CommandHandler.new(params).process
  end
end
