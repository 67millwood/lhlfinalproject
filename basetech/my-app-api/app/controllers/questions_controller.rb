class QuestionsController < ApplicationController
  def show
    @question = question.find_by(id: 1)
    conversation = Conversation.find(message_params[:conversation_id])
    QuestionsChannel.broadcast_to conversation
  end

end
