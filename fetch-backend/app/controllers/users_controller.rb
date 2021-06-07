class UsersController < ApplicationController

    def create
        user = User.find_or_create_by(username: user_params["username"])
        render json: user    
    end

    def get_earns 
        user = User.find(params['id'])
        #sorted in descending order so that oldest transactions are at the top in frontend display
        earnTransactions = user.transactions.sort_by{|t| t.created_at}.reverse() 
        render json: earnTransactions
    end 

    def get_spends 
        byebug
        
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
