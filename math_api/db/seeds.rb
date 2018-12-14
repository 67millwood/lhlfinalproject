require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

## CATEGORIES

puts "Finding or Creating Categories ..."

Category.destroy_all

cat1 = Category.find_or_create_by! name: 'Exponents'
cat2 = Category.find_or_create_by! name: 'Fractions'
cat3 = Category.find_or_create_by! name: 'Order of Operations'

## PRODUCTS

puts "Re-creating Questions ..."

Question.destroy_all

Question.create!({
  category_id: 2,
  qtext:  'Men\'s Classy shirt',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'whatever',
  ans4: 'leafs'
})

Question.create!({
  category_id: 2,
  qtext:  'Women\'s Zebra pants',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'famous',
  ans4: 'bruins'
})

Question.create!({
  category_id: 2,
  qtext:  'Hipster Hat',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'interesting',
  ans4: 'sabres'
})

Question.create!({
  category_id: 1,
  qtext:  'Hipster Socks',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'normal',
  ans4: 'devils'
})

Question.create!({
  category_id: 1,
  qtext:  'Russian Spy Shoes',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'abc123',
  ans4: 'canucks'
})

Question.create!({
  category_id: 1,
  qtext:  'Human Feet Shoes',
  ans1: Faker::Hipster.paragraph(4),
  ans2: Faker::Name.unique.name,
  ans3: 'abc',
  ans4: 'canadiens'
})



## Students
Student.destroy_all

puts "Re-creating Students ..."

stud1 = Student.create(email: "Billy")
stud2 = Student.create(email: "Cindy")
stud3 = Student.create(email: "Davey")
stud4 = Student.create(email: "Carol")


## Teachers
Teacher.destroy_all

puts "Re-creating Teachers ..."

stud1 = Teacher.create(email: "MRbill")
stud2 = Teacher.create(email: "MRpink")
stud3 = Teacher.create(email: "MRred")
stud4 = Teacher.create(email: "MRgreen")



puts "DONE!"
