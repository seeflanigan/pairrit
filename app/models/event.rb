class Event < ApplicationRecord
  belongs_to :pair
  belongs_to :user
end
