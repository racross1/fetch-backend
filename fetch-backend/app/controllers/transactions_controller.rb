class TransactionsController < ApplicationController

# class methods to be added to create 
def create
    #have amount check here and in transaction controller as well
    #here so that transaction not processed and error message is shown
    
    #all of the below needs to be tested and connected to frontend. just coded here in order to shape how model methods done
    amount = transaction_params[:init_amount]
    user = User.find(transaction_params[:user_id])
    user_bal = user['pts_balance']

    if amount > user_bal
        render json: { error: 'failed to create user' }
    else  
        transaction = Transaction.create(user_id: transaction_params[:user_id], transaction_params[:payer_id], init_amount: amount, active_amount: amount)
        transaction_summary = transaction.process_new_transaction
        render json: transaction_summary
    end
   
    #check user balance
    #if requested amount exceeds user balance, give error message

    #transaction = new transaction
    #user is from params
    #payer is from params

    #user = find_by id 
    #user.updatescore(transaction)
    #payer.updatescore(transaction)
end 


end


private

def transaction_params 
    params.require(:transaction).permit(:user_id, :payer_id, :init_amout)
end