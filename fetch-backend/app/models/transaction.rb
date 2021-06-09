class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  
  def process_new_transaction
    user = User.find(self.user_id)
    payer = Payer.find(self.payer_id)
    amount = self.init_amount

    user_bal = user.pts_balance

    self.save

    user.update(pts_balance: user_bal + amount)
    
    payer_bal = user.update_payer_bal(payer.id, amount)

    return {"updated_user_pts": user.pts_balance, "payer": payer, "updated_payer_pts": payer_bal, "earn_transaction": self}

  end

end
