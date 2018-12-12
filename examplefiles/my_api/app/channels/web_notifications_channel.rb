class WebNotificationsChannel < ApplicationCable::Channel
  def subscribed
    # stream_for current_user
    stream_from 'WebNotificationChannel'
  end

  def send_data(data)
    ActionCable.server.broadcast('WebNotificationChannel', { data: data['data'] })
  end
end