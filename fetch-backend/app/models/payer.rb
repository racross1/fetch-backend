class Payer < ApplicationRecord
    has_many :transactions
    has_many :users, through: :transactions

    # def get_global_active_transactions
    #     return self.transactions.select{|t| t.active_amount != 0}
    # end

    # #creates hash of payer_bals with payer id as key and payer [points, name] as value
    # def self.get_global_payer_bals
    #     payers = self.all
    #     payerBals = {}

    #     payers.each do |p| 
    #         activePayerTransactions = self.get_global_active_transactions
        
        
    #     activeUserTransactions.each do |t|
    #         payer_id = t.payer_id
    #         payer = Payer.find(payer_id)

    #     if !payerBals.has_key?(payer_id)
    #         payerBals[payer_id] = [0, payer.name]
    #     end 
    #     payerBals[payer_id][0] += t.active_amount
    # end 
        
    #     return payerBals
    # end 
end
