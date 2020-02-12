class RemoveGender < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :gender
  end
end
