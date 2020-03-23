require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class Comment < ApplicationRecord
  belongs_to :song,
    foreign_key: :song_id,
    class_name: 'Song'

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  def convert_time
    time_ago_in_words(self.created_at)
  end
end
