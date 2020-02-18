Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create, :show]
    resources :songs, only: [:show, :create]
    get 'songs/by_user/:username', :to => 'songs#by_user'
    get 'songs/songshow/:username/:hyperlink', :to => 'songs#songshow' 
  end

end
