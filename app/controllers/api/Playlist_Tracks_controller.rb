class Api::PlaylistTracksController < ApplicationController
  def create
    debugger
    @playlisttrack = PlaylistTrack.new(playtrack_params)
    @playlisttrack.save
  end

  def destroy
  end

  private

  def playtrack_params
    params.require(:PlaylistTrack).permit(:track_id, :playlist_id)
  end

end
