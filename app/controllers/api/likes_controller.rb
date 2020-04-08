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

  def delete_by_info
    @like = Like.find_by(user_id: params[:user_id], likeable_id: params[:likeable_id], likeable_type: 'Song')
  end


  private 

  def like_params
    params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
  end 
end
