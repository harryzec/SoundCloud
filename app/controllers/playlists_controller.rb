class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
    render :index
  end

  
  
  def create
    @playlist = Playlist.new(create_params)
    if @playlist.save
        
    else 
        render ["this did NOT work"], status: 404
    end
  end


  private 
  def create_params
    params.require(:playlist).permit(:creater_id, :title)
  end

end
