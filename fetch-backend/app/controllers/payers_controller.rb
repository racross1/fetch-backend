class PayersController < ApplicationController
    def index
        payers = Payer.all 
        render json: payers
    end

    def show
    end
    
end
