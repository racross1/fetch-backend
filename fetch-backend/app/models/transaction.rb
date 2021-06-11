class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  
  def process_new_transaction
    user = User.find(self.user_id)
    payer = Payer.find(self.payer_id)
    amount = self.init_amount

    user_bal = user.pts_balance
    if user_bal === nil
      user_bal = 0
    end 

    payer_bal = payer.pts_balance
    if payer_bal === nil
      payer_bal = 0
    end 

    self.save

    user.update(pts_balance: user_bal + amount)
    payer.update(pts_balance: payer_bal + amount)
    
    payer_bal_for_user = user.update_payer_bal(payer.id)

    return {"updated_user_pts": user.pts_balance, "payer": payer, "updated_payer_pts": payer_bal_for_user, "earn_transaction": self}

  end

end
