class SpendsController < ApplicationController
    
    def create
        amount = spend_params[:amount]
        user = User.find(spend_params[:user_id])

        spend = Spend.new(user_id: user.id, amount: amount)
        result = spend.process_spend

        if !result 
            render json: { error: 'insufficient funds' }
        else  
            render json: result
        end 
    end

    private

    def spend_params 
        params.require(:spend).permit(:user_id, :amount)
    end


end
