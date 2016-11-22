class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :action, null: false
      t.references :user, foreign_key: true, null: false
      t.references :pair, foreign_key: true, null: false

      t.timestamps
    end
  end
end
