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
      active_transactions = user.get_sorted_active_transactions 
      output = self.get_spend_output(active_transactions, amount)
    end

    puts output
    return output

  end
  

  def get_spend_output(active_transactions, amount)
    running_sum = 0
    i = 0
    spend_output = []
    amount = amount.abs()
    user = User.find(active_transactions[0].user_id)
    user_pts = user.pts_balance
    payers = user.get_payer_bals

    while running_sum < amount do
      curr = active_transactions[i]
      curr_amount = curr.active_amount
      curr_payer = Payer.find(curr.payer_id)
      curr_payer_pts_bal = payers[curr_payer]

      if running_sum  + curr_amount <= amount
        running_sum += curr_amount
      
        spend_output << {"payer": curr_payer.name, "points": (curr_amount * -1), "timestamp": curr.created_at}

        # curr_payer.update(pts_balance: curr_payer_pts_bal - curr_amount)
        payers[curr.payer_id] = curr_payer_pts_bal - curr_amount

        curr.update(active_amount: 0)
        i = i + 1
      else
        diff = amount - running_sum
        running_sum += diff

        spend_output << {"payer": curr_payer.name, "points": (diff * -1), "timestamp": curr.created_at}
        #may not need to run this update here
        payers[curr.payer_id] = curr_payer_pts_bal - diff
        curr.update(active_amount: curr_amount - diff)

      end 
      
    end 

    user.update(pts_balance: user_pts - amount)
    #returns spend output and updated payer bals for this user
    return [spend_output, user.get_payer_bals]

  end

end



