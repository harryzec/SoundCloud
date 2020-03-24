class Changetypecolumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :type, :catagory
    rename_column :playlists, :type, :catagory
    rename_column :songs, :type, :catagory
  end
end
