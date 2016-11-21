class Pair < ApplicationRecord
  def self.clone_or_initialize_by(args)
    pair = Pair.order('created_at DESC').lock(true).find_or_initialize_by(args)

    if pair.id?
      pair.dup
    else
      pair
    end
  end
end
