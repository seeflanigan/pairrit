class RemoveChannelAndTeamFromPair < ActiveRecord::Migration[5.0]
  def change
    remove_column :pairs, :channel_id
    remove_column :pairs, :channel_name
    remove_column :pairs, :team_id
    remove_column :pairs, :team_domain
  end
end
