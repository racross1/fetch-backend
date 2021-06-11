Rails.application.routes.draw do
  resources :spends, only: :create
  resources :transactions, only: :create
  resources :payers, only: :index
  resources :users, only: :create

  get '/users/:id/earns', to: 'users#get_earns', as: 'earns'
  get '/users/:id/newspend', to: 'users#get_latest_spend', as: 'newspend'
  get '/users/:id/payerbals', to: 'users#get_payer_bals', as: 'payerbals'
end
