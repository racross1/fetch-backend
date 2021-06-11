class PayersController < ApplicationController
    def index
        payers = Payer.all 
        render json: payers
    end

    def get_global_payer_bals
    end 
    
end
