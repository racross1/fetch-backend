class User < ApplicationRecord
    has_many :transactions
    has_many :spends
    has_many :payers, through: :transactions
    validates :pts_balance, :numericality => { :greater_than_or_equal_to => 0 }

    def get_active_transactions
        return self.transactions.select{|t| t.active_amount != 0}
    end

    def get_sorted_active_transactions
        transactions = self.get_active_transactions
        sorted = transactions.sort_by{|t| t.created_at}
        return sorted
    end 
    
    #creates hash of payer_bals with payer id as key and points as value
    def get_payer_bals
        activeUserTransactions = self.get_active_transactions
        payers = {}
        
        activeUserTransactions.each do |t|
            payer_id = t.payer_id
            if !payers.has_key?(payer_id)
                payers[payer_id] = 0
            end 
            payers[payer_id] += t.active_amount
        end 
        
        return payers
    end 
end
