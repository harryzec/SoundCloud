class Api::SongsController < ApplicationController

  def show
    @song = Song.find_by(id: params[:id])
    if @song
      render :show
    else 
      render json: ['no track found'], status: 404
    end
  end

  def new
  end

  def by_user
    @user = User.find_by(username: params[:username])
    @songs = Song.where(user_id: @user.id)

    if @songs
        render :index
    else
        render json: ["no songs found"], status: 404
    end
  end

  def songshow 
    usernameShow = User.find_by(username: params[:username].split('-').join(' '))
    @song = usernameShow.songs.where(hyperlink: params[:hyperlink])[0]
    render :showsong
  end

  def create
    @song = Song.new(song_params)
    if @song.save 
      render :show
    else 
      render json: @song.errors.full_messages
    end
  end

  def update
    @song = Song.find_by(id: params[:id])
    

    # song_params.reject! {|k| k==:id}
    if @song.update(song_params)
      render :show
    else 
      render json: @song.errors.full_messages, status: 422
    end
  end

  def destroy
    @song = Song.find_by(id: params[:id])
    @song.destroy
  end

  private

  def song_params
    params.require(:song).permit(:title, :genre, :user_id, :track, :description, :hyperlink, :photo)
  end

end
