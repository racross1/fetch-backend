class CreatePayers < ActiveRecord::Migration[6.1]
  def change
    create_table :payers do |t|
      t.string :name
      t.integer :pts_balance

      t.timestamps
    end
  end
end
