class Api::PlaylistTracksController < ApplicationController
  def create
    @playlisttrack = PlaylistTrack.new(playtrack_params)
    @playlisttrack.save
  end

  def destroy
    @playlisttrack = PlaylistTrack.find_by(playlist_id: params[:PlaylistTrack][:playlist_id], track_id: params[:PlaylistTrack][:track_id])
    @playlisttrack.destroy
  end

  private

  def playtrack_params
    params.require(:PlaylistTrack).permit(:track_id, :playlist_id)
  end

end
