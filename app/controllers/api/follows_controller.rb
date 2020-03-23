class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)

    if @follow.save 
    else
      render json: @follow.errors.full_messages, status: 422
    end 
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
  end


  private

  def follow_params
    params.require(:follow).permit(:user_id, :follower_id)
  end 
end
