class TransactionsController < ApplicationController

    def index
        byebug
        earnTransactions = Transaction.all.sort_by{|t| t.created_at}
        latestTen = earnTransactions.slice(0,11)

        render json: latestTen
    
    end

    def create
        amount = transaction_params["init_amount"].to_i
        user = User.find(transaction_params["user_id"])
        user_bal = user.pts_balance
        
        transaction = Transaction.new(user_id: transaction_params["user_id"], payer_id: transaction_params["payer_id"], init_amount: amount, active_amount: amount)
        new_balances = transaction.process_new_transaction
        render json: new_balances
    end 


    private

    def transaction_params 
        params.require(:transaction).permit(:user_id, :payer_id, :init_amount)
    end

end