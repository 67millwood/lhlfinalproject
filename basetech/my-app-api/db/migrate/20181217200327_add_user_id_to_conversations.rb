class AddUserIdToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :user_id, :string
  end
end
