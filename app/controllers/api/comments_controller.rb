class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(body: params[:body], user_id: params[:user_id], song_id: params[:song_id])
    @comment.save    
  end

  private

    def comment_params
        params.require(:comment).permit(:author_id, :track_id, :body)
    end
end
