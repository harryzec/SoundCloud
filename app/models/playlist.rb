class Playlist < ApplicationRecord
  validates :title, presence: true
  validates :user_id, presence: true

  has_many :playlist_tracks,
    foreign_key: :playlist_id,
    class_name: :PlaylistTrack,
    dependent: :destroy

  has_many :tracks,
    through: :playlist_tracks,
    source: :song

  belongs_to :User,
    foreign_key: :user_id,
    class_name: :User
    
  has_one_attached :photo

  def self.search(search)
    Playlist.where("lower(title) LIKE ?", "#{search.downcase}%").select("title, catagory, user, permalink") + Playlist.where("lower(title) LIKE ?", "% #{search.downcase}%").select("title, catagory, user, permalink")
  end
end
