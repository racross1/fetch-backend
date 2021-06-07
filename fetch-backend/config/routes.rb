Rails.application.routes.draw do
  resources :spends
  resources :transactions
  resources :payers
  resources :users

  get '/users/:id/earns', to: 'users#get_earns', as: 'earns'
  # get '/users/:id/spends', to: 'users#get_spends', as: 'spends'
  get '/users/:id/payerbals', to: 'users#get_payer_bals', as: 'payerbals'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
