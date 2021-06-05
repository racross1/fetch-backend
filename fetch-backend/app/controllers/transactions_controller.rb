class TransactionsController < ApplicationController

    def create
        amount = transaction_params[:init_amount]
        user = User.find(transaction_params[:user_id])
        user_bal = user.pts_balance
        
        transaction = Transaction.new(user_id: transaction_params[:user_id], transaction_params[:payer_id], init_amount: amount, active_amount: amount)
        new_balances = transaction.process_new_transaction
        render json: new_balances

    end 


private

    def transaction_params 
        params.require(:transaction).permit(:user_id, :payer_id, :init_amout)
    end

end