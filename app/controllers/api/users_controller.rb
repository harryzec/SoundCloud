class Api::UsersController < ApplicationController
  def index
    if params[:email]
      userEmail = params[:email].values.join('')
      if @user = User.find_by_email(userEmail)
        render json: { email: userEmail }
      else 
        render json: { email: userEmail }, status: 404
      end
    end
  end

  def randomusers
    
    @users = []
    while @users.length != 3
      user = User.all.sample
      if user.id == current_user.id
      else 
        if user.followers.all? { |follow| follow.follower_id != @current_user.id } 
          @users.push(user)
        end
      end

    end
    render :index
  end

  def show
    
    @user = User.find_by(username: params[:username])

    if @user
        render :show
    else
        render json: ["no artist found"], status: 404
    end
  end

  def follower_content
    
    follows = User.find_by(id: params[:id]).follows
    users = follows.map {|follow| User.find_by(id: follow.user_id) }
    @results = []
    users.each do |user|
      partial = user.songs + user.playlists
      @results += partial
    end
    

    @results.sort_by(&:created_at)
    render :recent

  end 

  def find_by_username
    @user = User.find_by(username: params[:username])

    if @user
        render :show
    else
        render json: ["no artist found"], status: 404
    end
  end

  def recent_creations
    
    user = User.find_by(username: params[:username])
    songs = Song.where(user_id: user.id).select('id')
    songs = songs.map {|id| Song.find_by(id: id)}
    playlists = Playlist.where(user_id: user.id).select('id')
    playlists = playlists.map {|id| Playlist.find_by(id: id)}

    
    
    @results = (playlists + songs)
    @results = @results.sort_by(&:created_at).reverse
    
    render :recent
  end


  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])

    if @user.update(user_params)
      render :update
    else 
    end
  end


  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :profile_picture, :cover_photo, :id)
  end
end
