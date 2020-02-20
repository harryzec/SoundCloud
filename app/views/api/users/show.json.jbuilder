

json.set! @user.username do

  json.extract! @user, :id, :username

  if @user.profile_picture.attached?
   json.profileUrl url_for(@user.profile_picture)
  else
    json.profileUrl nil
  end

  if @user.cover_photo.attached?
   json.coverUrl url_for(@user.cover_photo)
  else
    json.coverUrl nil
  end

end