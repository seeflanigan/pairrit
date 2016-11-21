class CreateUser < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :slack_id
      t.references :team, foreign_key: true
    end
    add_index :users, :slack_id, unique: true
  end
end
