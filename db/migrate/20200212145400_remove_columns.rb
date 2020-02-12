class RemoveColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :age, :gender
  end
end
