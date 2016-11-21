class RemovePairFromUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :pair_id
  end
end
