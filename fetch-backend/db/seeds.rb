# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.delete_all
Payer.delete_all


u1 = User.create(username: 'test_user', pts_balance: 1000)

p1 = Payer.create(name: "DANNON", pts_balance: 0)
p2 = Payer.create(name: "MILLER COORS", pts_balance: 0)
p3 = Payer.create(name: "GAP", pts_balance: 0)
p4 = Payer.create(name: "UNILEVER", pts_balance: 0)




puts "done"