class Api::SearchesController < ApplicationController
  def search
    
    @songs = [Song.search(params[:search])]
    
    @playlists = [Playlist.search(params[:search])]
    @artists = [User.search(params[:search])]
    
    @return = @songs + @playlists + @artists
    render json: @return
  end

  private 
  
  def search_params
    params.require(:search).permit(:search)
  end

end
