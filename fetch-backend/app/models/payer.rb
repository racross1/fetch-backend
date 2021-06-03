class Payer < ApplicationRecord
    has_many :transactions
    has_many :users, through: :transactions

    def update_score(transaction)
    end 

    
end
