class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  def self.get_active_transactions
     active_transactions = Transaction.all.select{|t| t.active_amount != 0}
     sorted_active_transactions = active_transactions.sort_by{|t| t.created_at}
     
     return sorted_active_transactions
  end 

  
  def process_new_transaction
    user = User.find(self.user_id)
    payer = Payer.find(self.payer_id)
    amount = self.init_amount

    user_bal = user.pts_balance
    payer_bal = payer.pts_balance

    self.save

    user.update(pts_balance: user_bal + amount)
    payer.update(pts_balance: payer_bal + amount)
    puts user.pts_balance
    puts payer.pts_balance
    return {"updated_user_pts": user.pts_balance, "payer": payer.id,"updated_payer_pts": payer.pts_balance, "spend_transaction": self}
  end

end
