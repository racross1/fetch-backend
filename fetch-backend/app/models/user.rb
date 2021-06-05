class User < ApplicationRecord
    has_many :transactions
    has_many :spends
    has_many :payers, through: :transactions
    validates :pts_balance, :numericality => { :greater_than_or_equal_to => 0 }
end
