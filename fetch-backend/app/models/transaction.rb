class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :payer

  def self.get_active_transactions
     active_transactions = Transaction.all.select{|t| t[active_amount] != 0}
     #sort descending to cut down time complexity
     sorted_active_transactions = active_transactions.sort_by{|t| t[created_at]}.reverse
     return sorted_active_transactions

  end 

  #transaction has already been validated as less than payer balance 
  #and therefore created

  #scratch notes
    ##takes arg of transaction

    ##if positive, update user and payer bals

    ## if negative, get all transactions where active amount is nonzero
    ## sort by timestamp
    ##starting from end, get cutoff point
    ##modify active amounts on all payer and user amounts 

    ##return array of allocated expenses 
    ##update current user and payer bal (ensure neither goes below zero)
    
    ##method to get current user and payer bal
    
    #check if amount greater than user bal?
   #if so, just for CLI application

    #add var for new abalance for each and update user and payer point
    #bals to reflect this
    #where to do check for no nonzero
    #here i think -> if amount > user pts bal then errror message

  def process_new_transaction(transaction)
    user = User.find(transaction[user_id])
    payer = Payer.find(transaction[payer_id])
    amount = transaction[init_amount]

    user_bal = user[pts_balance]
    payer_bal = payer[pts_balance]

    #this check is done in transaction controller within create method
    #repeated here in case of use in CLI / for adding transactions in seed file
    if amount > user_bal 
      puts "insufficient funds - add more points!"
      return 
    end 

  
    if amount >= 0
      user.update(pts_balance: user_bal + amount)
      payer.update(pts_balance: payer_bal + amount)
      #tbd what gets returned here
      #have separate method to check if it's a valid transaction (to be used in controller and here)? 
      return 
    else
      #make transaction 0 so that it does not show up in get_active transaction list
      #before this point will have already been validated that user has sufficient funds
      transaction.update(active_amount: 0) 
      active_transactions = Transaction.get_active_transactions
      output = transaction.get_transaction_output(active_transactions, amount)
    end 


  end 
  
  def get_transaction_output(active_transactions, amount)
    running_sum = amount
    i = 0
    while running_sum > 0
      curr = active_transactions[i]

      #logic here for running total that finds cutoff point then allocates
      #to payers accordingly

      
    end 

  end



end
