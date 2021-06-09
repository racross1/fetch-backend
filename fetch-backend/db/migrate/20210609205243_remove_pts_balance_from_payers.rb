class RemovePtsBalanceFromPayers < ActiveRecord::Migration[6.1]
  def change
    remove_column :payers, :pts_balance, :integer
  end
end
