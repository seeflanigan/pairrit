class AddPairIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :pair, foreign_key: true
  end
end
