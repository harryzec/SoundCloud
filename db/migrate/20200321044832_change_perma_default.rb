class ChangePermaDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :playlists, :permalink, ''
  end
end
