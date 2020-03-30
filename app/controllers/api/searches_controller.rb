class Api::SearchesController < ApplicationController
  def search
 
    @songs = [Song.search(params[:search])]
    @songs = @songs.flatten
    @songs = @songs.map {|id| Song.find_by(id: id)}

    @playlists = [Playlist.search(params[:search])]
    @playlists = @playlists.flatten
    @playlists = @playlists.map { |id| Playlist.find_by(id: id)}

    @users = [User.search(params[:search])]
    @users = @users.flatten
    @users = @users.map {|id| User.find_by(id: id)}
    @searched = @songs + @playlists + @users
    render :index
  end

  private 
  
  def search_params
    params.require(:search).permit(:search)
  end

end
