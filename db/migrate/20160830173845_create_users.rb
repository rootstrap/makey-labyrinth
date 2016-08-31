class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :last_name
      t.integer :phone
      t.string :address
      t.string :email
      t.string :career
      t.boolean :won

      t.timestamps null: false
    end
  end
end
