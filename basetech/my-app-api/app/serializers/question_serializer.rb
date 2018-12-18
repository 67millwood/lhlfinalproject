class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :qtext, :ans1, :ans2, :ans3, :ans4
end
