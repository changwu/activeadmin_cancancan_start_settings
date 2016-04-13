class CreateAdminRoles < ActiveRecord::Migration
  def migrate(direction)
    super
    # Create a default user
    if direction == :up
      AdminRole.create!(id: 1, name: 'super_user')
      AdminRole.create!(id: 2, name: 'admin')
      AdminRole.create!(id: 3, name: 'user')
    end
  end

  def change
    create_table :admin_roles do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
