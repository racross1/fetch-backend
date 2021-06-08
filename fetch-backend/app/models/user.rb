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

    def get_named_payer_bals
        payerBals = self.get_payer_bals
        namedPayerBals = {}

        payerBals.each do |k,v|
            namedPayerBals[Payer.find(k).name] = v
        end 

        return namedPayerBals
    end 

    def update_payer_bal(payer_id, transactionAmount)
        #getpayerbals returns hash with key of payer id and value of bal
        payers = self.get_payer_bals
        if !payers.has_key?(payer_id)
            payers[payer_id] = 0
            payers[payer_id] += transactionAmount
        end 
        
        

        # byebug
        # output_amount = payers[payer_id]
        # return output_amount

        # output_amount = payers[payer_id]
        return payers[payer_id]


    end


end
