json.extract! reservation, :id, :party_size, :reservation_date, :reservation_slot, :party_name, :contact_phone, :contact_email, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
