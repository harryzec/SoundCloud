class AddTypeToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :type, :string, default: 'song'
  end
end
