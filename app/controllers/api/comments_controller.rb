class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(body: params[:body], user_id: params[:user_id], song_id: params[:song_id])
    @comment.save    
  end

  def destroy 
    @comment = Comment.find_by(id: params[:id])
    @comment.destroy
  end

  private

    def comment_params
        params.require(:comment).permit(:id, :author_id, :track_id, :body)
    end
end
