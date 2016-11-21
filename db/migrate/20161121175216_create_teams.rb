class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.string :domain, null: false
      t.string :slack_id, null: false
    end
    add_index :teams, :slack_id, unique: true
  end
end
