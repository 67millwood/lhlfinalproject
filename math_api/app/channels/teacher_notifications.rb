class TeacherNotifications < ApplicationCable::Channel
  def subscribed
    #stream_for current_user
    stream_from 'TeacherNotifications'
  end

  def send_data(data)
    ActionCable.server.broadcast('TeacherNotifications', { data: data['data'] })
  end
end
