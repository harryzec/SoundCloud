class Api::UsersController < ApplicationController
  def index
    if params[:email]
      if @user = User.find_by(email: params[:eamil])
        render json: { email: params[:email] }
      else 
        render json: { email: params[:email] }, status: 404
      end
    end
  end

  def show
    @user = User.find_by(username: params[:id])
    if @user
        render json: @user
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
    params.require(:user).permit(:email, :username, :password)
  end
end
