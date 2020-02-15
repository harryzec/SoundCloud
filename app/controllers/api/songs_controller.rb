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
    @song = Song.new()
  end

  def update
  end

  def destroy
  end

  private

  def song_params
    params.require(:user).permit(:title, :genre, :user_id, :track)
  end

end
