class Song < ApplicationRecord
  validates :title, :user_id, :genre, presence: true

  has_one_attached :track

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'
end
