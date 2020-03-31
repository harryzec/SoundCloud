json.set! @follow.id do
  json.extract! @follow, :id, :follower_id, :user_id
end