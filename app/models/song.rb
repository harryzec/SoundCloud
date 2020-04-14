require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class Song < ApplicationRecord
  validates :title, :user_id, :genre, :hyperlink, presence: true
  has_one_attached :track
  has_one_attached :photo
  # validate :track_attached

  has_many :likes, as: :likeable

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :playlist_tracks,
    foreign_key: :track_id,
    class_name: :PlaylistTrack,
    dependent: :destroy

  has_many :playlists,
    through: :playlist_tracks,
    source: :playlist

  has_many :comments,
    foreign_key: :song_id,
    class_name: 'Comment',
    dependent: :destroy

  def self.search(search)
    songs = Song.where("lower(title) LIKE ?", "#{search.downcase}%").select("id") +  Song.where("lower(title) LIKE ?", "% #{search.downcase}%").select("id") 
    songs.map {|song| song.id }
  end

  def convert_time
    time_ago_in_words(self.created_at)
  end

  private 


end
