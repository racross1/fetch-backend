class Spend < ApplicationRecord
  belongs_to :user

  
  def process_spend
    user = User.find(self.user_id)
    amount = self.amount
    user_bal = user.pts_balance
    
    if amount.abs() > user_bal 
      puts "insufficient funds - add more points!"
      return false
    else
      self.save
      active_transactions = Transaction.get_active_transactions 
      spend_output = self.get_spend_output(active_transactions, amount)
    end

    puts spend_output
    return spend_output

  end
  

  def get_spend_output(active_transactions, amount)
    running_sum = 0
    i = 0
    current_cutoff = i
    spend_output = []
    amount = amount.abs()
    user = User.find(active_transactions[0].user_id)
    user_pts = user.pts_balance

    while running_sum < amount do
      curr = active_transactions[i]
      curr_amount = curr.active_amount
      curr_payer = Payer.find(curr.payer_id)
      curr_payer_pts_bal = curr_payer.pts_balance

      if running_sum  + curr_amount <= amount
        running_sum += curr_amount
      
        spend_output << {"payer": curr_payer.name, "points": curr_amount, "timestamp": curr.created_at}

        curr_payer.update(pts_balance: curr_payer_pts_bal - curr_amount)
        curr.update(active_amount: 0)
        i = i + 1
      else
        diff = amount - running_sum
        running_sum += diff

        spend_output << {"payer": curr_payer.name, "points": diff, "timestamp": curr.created_at}
        curr_payer.update(pts_balance: curr_payer_pts_bal - diff)
        curr.update(active_amount: curr_amount - diff)

      end 
      
    end 

    user.update(pts_balance: user_pts - amount)
    return spend_output

  end

end



