class Song < ApplicationRecord
  validates :title, :user_id, :genre, presence: true
  has_one_attached :track
  validate :track_attached

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  private 

  def track_attached
    if !track.attached? 
      errors.add(:track, 'must be present')
    end
  end
end
