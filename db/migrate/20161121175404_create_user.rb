class CreateUser < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :slack_id, null: false
      t.references :team, foreign_key: true, null: false
    end
    add_index :users, :slack_id, unique: true
  end
end
