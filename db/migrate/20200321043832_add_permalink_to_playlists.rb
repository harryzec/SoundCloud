class AddPermalinkToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :permalink, :string, default: 'None'
  end
end
