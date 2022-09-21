Rails.application.routes.draw do
  namespace :api do
    get 'restaurants/index'
    get 'reservations/index'
    post 'reservations/create'
    delete 'reservations/:id', to: 'reservations#destroy'
  end

  root "reservations#index"
end
