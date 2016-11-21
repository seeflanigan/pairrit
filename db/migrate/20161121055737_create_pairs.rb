class CreatePairs < ActiveRecord::Migration[5.0]
  def change
    create_table :pairs do |t|
      t.string :name, null: false
      t.string :channel_name
      t.string :channel_id
      t.string :team_id
      t.string :team_domain
      t.integer :participants, array: true, default: []

      t.timestamps
    end

    add_index :pairs, :name
    add_index :pairs, :channel_id
    add_index :pairs, :participants
  end
end
