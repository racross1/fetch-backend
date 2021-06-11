class Spend < ApplicationRecord
  belongs_to :user

  #process_spend takes new transaction and if valid, saves it
  #and then returns spend_output_payload (separate method)
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
      output = self.get_spend_output_payload(active_transactions, amount)
    end

    return output

  end
  
  #get_spend_output_payload receives user's active transactions (earn transactions with balance > 0) sorted by timestamp, as well as spend amount
  #method iterates through sorted transactions so that older vintages are spent first
  #spend output payload is hash with following attributes: spend_output hash, updated payer point balances hash, updated user points balance
  def get_spend_output_payload(active_transactions, amount)
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
      curr_payer_global_pts = curr_payer.pts_balance
      curr_payer_pts_bal = payers[curr.payer_id][0]
     
      if running_sum  + curr_amount <= amount
        running_sum += curr_amount
        spend_output << {'payer': curr_payer.name, 'points': (curr_amount * -1), 'timestamp': curr.earn_timestamp}
        payers[curr.payer_id][0] = curr_payer_pts_bal - curr_amount
        curr.update(active_amount: 0)
        curr_payer.update(pts_balance: curr_payer_global_pts - curr_amount)
        i = i + 1

      else
        diff = amount - running_sum
        running_sum += diff

        spend_output << {'payer': curr_payer.name, 'points': (diff * -1), 'timestamp': curr.earn_timestamp}

        payers[curr.payer_id][0] = curr_payer_pts_bal - diff
        curr_payer.update(pts_balance: curr_payer_global_pts - diff)
        curr.update(active_amount: curr_amount - diff)

      end 
      
    end 
    user.update(pts_balance: user_pts - amount)
   
    return {'spend_output': spend_output, 'payer_bals': payers, 'updated_user_pts': user.pts_balance}

  end

end



