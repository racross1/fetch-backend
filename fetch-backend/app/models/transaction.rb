class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  def process_transaction
    ##takes arg of transaction amount

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
