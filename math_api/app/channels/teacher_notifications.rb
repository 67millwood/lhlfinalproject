class TeacherNotifications < ApplicationCable::Channel
  def subscribed
    #stream_for current_user
    stream_from 'TeacherNotifications'
  end

  def unsubscribed
    #cleanups when channel is unsubscribed
  end


  def send_data(data)
    ActionCable.server.broadcast('TeacherNotifications', { data: data['this is data'] })
  end
end
