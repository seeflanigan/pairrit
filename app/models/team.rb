class Team < ApplicationRecord
  has_many :channels
  has_many :users

  def self.fetch(params)
    Team.find_or_create_by(slack_id: params['team_id']) do |team|
      team.domain = params['team_domain']
    end
  end
end
