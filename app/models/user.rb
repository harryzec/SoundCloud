class User < ApplicationRecord
  
  validates :email, :username, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  has_one_attached :profile_picture
  has_one_attached :cover_photo
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :followers,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Follow'

  has_many :follows,
    primary_key: :id,
    foreign_key: :follower_id,
    class_name: 'Follow'

  has_many :songs,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Song'

  has_many :playlists,
    class_name: :Playlist,
    foreign_key: :user_id

  has_many :comments,
    foreign_key: :user_id,
    class_name: 'Comment',
    dependent: :destroy

    def self.search(search)
      User.where("lower(username) LIKE ?", "#{search.downcase}%")
    end



  def self.find_by_email(email)
    user = User.find_by(email: email)
    return nil unless user
    return user
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end
