class CreateChannel < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.string :slack_id, null: false
      t.references :team, foreign_key: true, null: false
    end
    add_index :channels, :slack_id, unique: true
  end
end
