class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)

    if @like.save 
    else
      render json: @like.errors.full_messages, status: 422
    end 
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
  end


  private 

  def like_params
    params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
  end 
end
