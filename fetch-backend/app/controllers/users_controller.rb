class UsersController < ApplicationController

    def create
        user = User.find_or_create_by(username: user_params["username"])
        render json: user    
    end

    def get_earns 
        user = User.find(params['id'])
        #sorted in descending order so that oldest transactions are at the top in frontend display
        sortedActiveTransactions = user.get_sorted_active_transactions
        render json: sortedActiveTransactions.reverse().to_a
    end 

    def get_spends 
        byebug
        
    end 

    def get_payer_bals
        user = User.find(params['id'])
        namedPayerBals = user.get_named_payer_bals

        render json: namedPayerBals
    end 

    private 

    def user_params
        params.require(:user).permit(:username)
    end
    
end
