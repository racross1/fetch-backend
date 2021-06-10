Transaction.delete_all
Spend.delete_all
User.delete_all
Payer.delete_all

u1 = User.create(username: 'test_user', pts_balance: 0)

p1 = Payer.create(name: "DANNON")
p2 = Payer.create(name: "MILLER COORS")
p3 = Payer.create(name: "GAP")
p4 = Payer.create(name: "UNILEVER")

# t1 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 100, active_amount: 100)
# t1.process_new_transaction
# t2 = Transaction.create(user_id: u1.id, payer_id: p2.id, init_amount: 200, active_amount: 200)
# t2.process_new_transaction
# t3 = Transaction.create(user_id: u1.id, payer_id: p3.id, init_amount: 300, active_amount: 300)
# t3.process_new_transaction
# t4 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 50, active_amount: 50)
# t4.process_new_transaction
# t5 = Transaction.create(user_id: u1.id, payer_id: p2.id, init_amount: 500, active_amount: 500)
# t5.process_new_transaction

# # puts User.last.pts_balance

# s1 = Spend.new(user_id: u1.id, amount: -500)
# s1.process_spend
# s2 = Spend.new(user_id: u1.id, amount: -600)
# s2.process_spend

# # puts User.last.pts_balance

# s3 = Spend.new(user_id: u1.id, amount: -100)
# s3.process_spend

# puts `user bals: #{User.all}`
# puts User.last.pts_balance


puts "done"