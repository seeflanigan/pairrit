class CreateChannel < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :slack_id
      t.references :team, foreign_key: true
    end
    add_index :channels, :slack_id
  end
end
