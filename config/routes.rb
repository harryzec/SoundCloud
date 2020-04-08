Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :create, :show, :update]
    resources :songs, only: [:show, :create, :destroy, :update]
    resources :playlists, only: [:index, :create, :update, :destroy]
    resources :playlist_tracks, only: [:create]
    resources :comments, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
    delete 'playlist_tracks/destroy', :to => 'playlist_tracks#destroy'
    get 'songs/random_song/get', :to => 'songs#random_song'
    get 'users/follower_content/:id' => 'users#follower_content'
    get 'users/find_by_username/:username' => 'users#find_by_username'
    get 'users/random/follow', :to => 'users#randomusers'
    get 'users/recent_creations/:username', :to => 'users#recent_creations'
    get 'searches/search/:search', :to => 'searches#search'
    get 'playlists/get_playlist/:username/:permalink', :to => 'playlists#get_playlist'
    get 'songs/by_user/:username', :to => 'songs#by_user'
    get 'songs/by_user/popular/:username', :to => 'songs#by_user_popular'
    get 'playlists/by_user/:username', :to => 'playlists#by_user'
    get 'songs/songshow/:username/:hyperlink', :to => 'songs#songshow' 
  end

end
