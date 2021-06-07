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
    payer_bal = user.get_payer_bals[payer_id]

    self.save

    user.update(pts_balance: user_bal + amount)
    # payer.update(pts_balance: payer_bal + amount)
    payer_bal += amount
    
    return {"updated_user_pts": user.pts_balance, "payer": payer.id, "updated_payer_pts": payer_bal, "earn_transaction": self}
  end

end
