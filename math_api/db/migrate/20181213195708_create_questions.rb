class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :qtext
      t.string :ans1
      t.string :ans2
      t.string :ans3
      t.string :ans4

      t.timestamps
    end
  end
end
