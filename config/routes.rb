Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create, :show]
    resources :songs, only: [:show, :create, :destroy, :update]
    resources :playlists, only: [:index, :create]
    get 'songs/by_user/:username', :to => 'songs#by_user'
    get 'playlists/by_user/:username', :to => 'playlists#by_user'
    get 'songs/songshow/:username/:hyperlink', :to => 'songs#songshow' 
  end

end
