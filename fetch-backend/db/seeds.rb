# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Transaction.delete_all
User.delete_all
Payer.delete_all



u1 = User.create(username: 'test_user', pts_balance: 0)

p1 = Payer.create(name: "DANNON", pts_balance: 0)
p2 = Payer.create(name: "MILLER COORS", pts_balance: 0)
p3 = Payer.create(name: "GAP", pts_balance: 0)
p4 = Payer.create(name: "UNILEVER", pts_balance: 0)

# transaction = Transaction.create(user_id: transaction_params[:user_id], transaction_params[:payer_id], init_amount: amount, active_amount: amount)

t1 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 100, active_amount: 100)
t1.process_new_transaction
t2 = Transaction.create(user_id: u1.id, payer_id: p2.id, init_amount: 200, active_amount: 200)
t2.process_new_transaction
t3 = Transaction.create(user_id: u1.id, payer_id: p3.id, init_amount: 300, active_amount: 300)
t3.process_new_transaction
t4 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 50, active_amount: 50)
t4.process_new_transaction

puts Transaction.get_active_transactions[0]
puts Payer.all
# puts `user bals: #{User.all}`

puts "done"