class Api::PlaylistsController < ApplicationController
  def index
    @RPlaylists = Playlist.random
    render :index
  end


  def create
    @playlist = Playlist.new(create_params)
    if @playlist.save
      render :show
    else 
        render ["this did NOT work"], status: 404
    end
  end

  def get_playlist 
    user = User.find_by(username: params[:username])
    @playlist = Playlist.find_by(user_id: user.id, permalink: params[:permalink])
    render :show
  end

  def by_user
    
    @user = User.find_by(username: params[:username])
    @RPlaylists = Playlist.where(user_id: @user.id)

    if @RPlaylists
      render :index
    else
      render json: {}
    end
  end

  def update
    @playlist = Playlist.find_by(id: params[:id])
    
    if @playlist.update(create_params)
    else 
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist = Playlist.find_by(id: params[:id])
    @playlist.destroy
  end

  private 
  def create_params
    params.require(:playlist).permit(:user_id, :title, :photo, :permalink, :description, :genre)
  end

end
