class RemoveCategoryIdFromQuestions < ActiveRecord::Migration[5.2]
  def change
    remove_column :questions, :category_id, :integer
  end
end
