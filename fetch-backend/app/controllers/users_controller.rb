class UsersController < ApplicationController

    def create
        user = User.find_or_create_by(username: user_params['username'])
        
        render json: user    
    end

    def get_earns 
        user = User.find(params['id'])
        sorted_active_transactions = user.get_sorted_active_transactions
       
        render json: sorted_active_transactions
    end 


    def get_payer_bals
        user = User.find(params['id'])
        payerBals = user.get_payer_bals

        render json: payerBals
    end 

    private 

    def user_params
        params.require(:user).permit(:username)
    end
    
end
