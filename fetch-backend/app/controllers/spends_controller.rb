class SpendsController < ApplicationController
    #add logic for receiving transaction params
    def create
        amount = transaction_params[:init_amount]
        user = User.find(transaction_params[:user_id])
        user_bal = user.pts_balance

        spend = Spend.new(user_id: spend_params[:user_id])
        result = spend.process_spend

        if !result 
            render json: { error: 'insufficient funds' }
        else  
            render json: result
        end 

    end

    private

    def spend_params 
        params.require(:spend).permit(:user_id, :amout)
    end


end
