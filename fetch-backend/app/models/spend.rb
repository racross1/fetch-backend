class Spend < ApplicationRecord
  belongs_to :user

  #spend includes user id and amount
  def process_spend
    user = User.find(self.user_id)
    amount = self.amount
     #this check is done in transaction controller within create method
    #repeated here in case of use in CLI / for adding transactions in seed file
    if amount.abs() > user_bal 
      self.destroy
      puts "insufficient funds - add more points!"
      return 
    else
      active_transactions = Transaction.get_active_transactions 
      spend_output = self.get_spend_output(active_transactions, amount)
    end

    return spend_output

  end
  


  def get_spend_output(active_transactions, amount)
    #get cutoff point and then update all transactions up to/ including that one
    running_sum = amount
    i = 0
    while running_sum > 0 do
      curr = active_transactions[i]

      #if 

      #logic here for running total that finds cutoff point then allocates
      #to payers accordingly

      
    end 

  end


end





#from old transaction model. 
#if amount is negative
# else
#   #make transaction 0 so that it does not show up in get_active transaction list
#   #before this point will have already been validated that user has sufficient funds
#   transaction.update(active_amount: 0) 
#   active_transactions = Transaction.get_active_transactions
#   output = transaction.get_transaction_output(active_transactions, amount)
# end 


#more notes from old transaction file

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
