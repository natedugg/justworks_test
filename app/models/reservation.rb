class Reservation < ApplicationRecord
  belongs_to :restaurant, foreign_key: :restaurant_id
end
