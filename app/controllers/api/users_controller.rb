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

  def show
    @user = User.find_by(username: params[:id])

    if @user
        render :show
    else
        render json: ["no artist found"], status: 404
    end
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


  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :profile_picture, :cover_photo)
  end
end
