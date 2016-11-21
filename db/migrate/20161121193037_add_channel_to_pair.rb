class AddChannelToPair < ActiveRecord::Migration[5.0]
  def change
    add_reference :pairs, :channel, foreign_key: true
  end
end
