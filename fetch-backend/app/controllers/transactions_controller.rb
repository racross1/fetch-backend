class TransactionsController < ApplicationController

    def index
        byebug
        earnTransactions = user.transactions.sort_by{|t| t.created_at}
        latestTen = earnTransactions.slice(0,10)

        render json: latestTen
    
    end

    def create
        amount = transaction_params["init_amount"].to_i
        user = User.find(transaction_params["user_id"])
        
        transaction = Transaction.new(user_id: transaction_params["user_id"], payer_id: transaction_params["payer_id"], init_amount: amount, active_amount: amount)
        new_balances = transaction.process_new_transaction
        render json: new_balances
    end 


    private

    def transaction_params 
        params.require(:transaction).permit(:user_id, :payer_id, :init_amount)
    end

end