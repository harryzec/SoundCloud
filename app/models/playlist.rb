class Playlist < ApplicationRecord
  validates :title, presence: true
  validates :user_id, presence: true

  has_many :likes, as: :likeable

  has_many :playlist_tracks,
    foreign_key: :playlist_id,
    class_name: :PlaylistTrack,
    dependent: :destroy

  has_many :tracks,
    through: :playlist_tracks,
    source: :song

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
    
  has_one_attached :photo

  def self.search(search)
    playlists = Playlist.where("lower(title) LIKE ?", "#{search.downcase}%").select("id") + Playlist.where("lower(title) LIKE ?", "% #{search.downcase}%").select("id")
    playlists.map {|playlist| playlist.id }
  end
end
