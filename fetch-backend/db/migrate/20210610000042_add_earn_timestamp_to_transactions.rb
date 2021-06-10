class AddEarnTimestampToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :earn_timestamp, :datetime
  end
end
