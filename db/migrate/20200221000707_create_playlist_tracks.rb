class CreatePlaylistTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :playlist_tracks do |t|
      t.integer :playlist_id
      t.integer :track_id

      t.timestamps
    end

      add_index :playlist_tracks, :playlist_id
      add_index :playlist_tracks, :track_id
      add_index :playlist_tracks, [:playlist_id, :track_id], unique: true
  end
end
