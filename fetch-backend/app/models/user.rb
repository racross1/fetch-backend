class User < ApplicationRecord
    has_many :transactions
    has_many :spends
    has_many :payers, through: :transactions
end
