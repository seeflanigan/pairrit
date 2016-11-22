class RemoveParticipantsFromPairs < ActiveRecord::Migration[5.0]
  def change
    remove_column :pairs, :participants
  end
end
