class ChangeGenre2Default < ActiveRecord::Migration[5.2]
  def change
    change_column_default :playlists, :genre, 'None'
  end
end
