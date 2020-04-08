class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render :create
    else
      render json: ["Invalid username/password combination"], status: 401
    end
  end

  

  def destroy
    dummy = current_user.dup
    @user = current_user
    if @user
      logout
      render json: dummy
    else
      render json: ["Nobody signed in"], status: 404
    end
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :profile_picture, :cover_photo, :id)
  end 

end
