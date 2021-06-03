class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  def process_new_transaction(amount, user, payer)
    user_bal = user["pts_balance"]
    payer_bal = payer["pts_balance"]

    #add var for new abalance for each and update user and payer point
    #bals to reflect this
    #where to do check for no nonzero
    #here i think -> if amount > user pts bal then errror message


    if amount > 0
      user.update(pts_balance: )


    ##takes arg of transaction amount, user and payer

    ##if positive, update user and payer bals

    ## if negative, get all transactions where active amount is nonzero
    ## sort by timestamp
    ##starting from end, get cutoff point
    ##modify active amounts on all payer and user amounts 

    ##return array of allocated expenses 
    ##update current user and payer bal (ensure neither goes below zero)
    
    ##method to get current user and payer bal
    ##method to 


  end 
  
  def update_payer_bal
  end 

  def update_user_bal
  end 


end
