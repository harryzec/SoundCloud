class AddHyperlinkToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :hyperlink, :string
  end
end
