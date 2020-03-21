class ChangeGenreDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :playlists, :permalink, 'None'
  end
end
