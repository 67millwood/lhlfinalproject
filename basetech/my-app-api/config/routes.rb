Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  resources :questions, only: [:show]
  mount ActionCable.server => '/cable'
end
