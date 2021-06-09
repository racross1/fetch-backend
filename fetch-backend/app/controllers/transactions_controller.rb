class TransactionsController < ApplicationController

    def create
        byebug
        amount = transaction_params["init_amount"].to_i
        user = User.find(transaction_params["user_id"])
        earn_timestamp = transaction_params["earn_timestamp"]
        
        transaction = Transaction.new(user_id: transaction_params["user_id"], payer_id: transaction_params["payer_id"], init_amount: amount, active_amount: amount)
        earn_output = transaction.process_new_transaction
        render json: earn_output
    end 


    private

    def transaction_params 
        params.require(:transaction).permit(:user_id, :payer_id, :init_amount, :earn_timestamp)
    end

end