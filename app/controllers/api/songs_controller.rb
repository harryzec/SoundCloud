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
  end

  def update
  end

  def destroy
  end

  private
  def song_params
    params.require(:user).permit(:title, :genre)
  end
end
