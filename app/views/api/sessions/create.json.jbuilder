json.extract! @user, :id, :username, :session_token, :password_digest, :email, :created_at, :updated_at

if @user.profile_picture.attached?
  json.profileUrl url_for(@user.profile_picture)
else
  json.profileUrl null
end