class AddPtsBalanceToPayer < ActiveRecord::Migration[6.1]
  def change
    add_column :payers, :pts_balance, :integer
  end
end
