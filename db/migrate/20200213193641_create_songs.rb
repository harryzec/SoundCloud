class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
      t.string :genre, null: false 
      t.integer :album_id
      t.string :tags

      t.timestamps
    end

  end
end
