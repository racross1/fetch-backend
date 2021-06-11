Transaction.delete_all
Spend.delete_all
User.delete_all
Payer.delete_all

def formatTimestamp(timestamp)
    formatted = DateTime.strptime(timestamp, '%Y-%m-%dT%H:%M:%S%z')
    return formatted
end

u1 = User.create(username: 'test_user', pts_balance: 0)
u2 = User.create(username: 'joe', pts_balance: 0)

p1 = Payer.create(name: "DANNON", pts_balance: 0)
p2 = Payer.create(name: "MILLER COORS", pts_balance: 0)
p3 = Payer.create(name: "GAP", pts_balance: 0)
p4 = Payer.create(name: "UNILEVER", pts_balance: 0)

t1 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 100, active_amount: 100, earn_timestamp: formatTimestamp("2021-06-01T06:00:00-07:00"))
t1.process_new_transaction
t2 = Transaction.create(user_id: u1.id, payer_id: p2.id, init_amount: 200, active_amount: 200, earn_timestamp: formatTimestamp("2021-05-13T22:00:00-07:00"))
t2.process_new_transaction
t3 = Transaction.create(user_id: u1.id, payer_id: p3.id, init_amount: 300, active_amount: 300, earn_timestamp: formatTimestamp("2021-05-13T11:00:00-07:00"))
t3.process_new_transaction
t4 = Transaction.create(user_id: u1.id, payer_id: p1.id, init_amount: 50, active_amount: 50, earn_timestamp: formatTimestamp("2021-05-27T04:00:00-07:00" ))
t4.process_new_transaction
t5 = Transaction.create(user_id: u1.id, payer_id: p2.id, init_amount: 500, active_amount: 500, earn_timestamp: formatTimestamp("2021-03-04T23:00:00-08:00"))
t5.process_new_transaction
t6 = Transaction.create(user_id: u1.id, payer_id: p4.id, init_amount: 800, active_amount: 800, earn_timestamp: formatTimestamp("2021-03-04T11:00:00-08:00"))
t6.process_new_transaction

t7 = Transaction.create(user_id: u2.id, payer_id: p1.id, init_amount: 10000, active_amount: 10000, earn_timestamp: formatTimestamp("2021-04-04T11:00:00-08:00"))
t7.process_new_transaction


puts "done"