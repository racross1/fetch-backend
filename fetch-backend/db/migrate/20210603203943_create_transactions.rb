class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :payer, null: false, foreign_key: true
      t.integer :init_amount
      t.integer :active_amount

      t.timestamps
    end
  end
end
