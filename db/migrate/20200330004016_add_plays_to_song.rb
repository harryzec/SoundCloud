class AddPlaysToSong < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :plays, :integer, default: 0
  end
end
