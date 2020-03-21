class AddGenreToPlaylist < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :genre, :string
  end
end
