Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create, :show]
    resources :songs, only: [:show, :create, :destroy, :update]
    resources :playlists, only: [:index, :create, :update, :destroy]
    resources :playlist_tracks, only: [:create]
    resources :comments, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
    delete 'playlist_tracks/destroy', :to => 'playlist_tracks#destroy'
    get 'searches/search/:search', :to => 'searches#search'
    get 'playlists/get_playlist/:username/:permalink', :to => 'playlists#get_playlist'
    get 'songs/by_user/:username', :to => 'songs#by_user'
    get 'playlists/by_user/:username', :to => 'playlists#by_user'
    get 'songs/songshow/:username/:hyperlink', :to => 'songs#songshow' 
  end

end
