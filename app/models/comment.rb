class Comment < ApplicationRecord
  belongs_to :song,
    foreign_key: :song_id,
    class_name: 'Song'

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  def convert_time
      self.created_at.to_f
  end
end
