class Api::SongsController < ApplicationController

  def index
  end

  def show
    @song = Song.with_attached_track.includes(:user).find(params[:id])
    if @song
      render :show
    else 
      render json: ['no track found'], status: 404
    end
  end

  def new
  end

  def create
    @song = Song.new(song_params)
    debugger
    if @song.save 
      render :show
    else 
      render json: @song.errors.full_messages
    end
  end

  def update
  end

  def destroy
  end

  private

  def song_params
    params.require(:song).permit(:title, :genre, :user_id, :track, :description)
  end

end
