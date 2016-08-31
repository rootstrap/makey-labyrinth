class UsersController < ApplicationController

  def create
    User.create(user_params)
    render 'users/create'
  end

  private

  def user_params
    params.require(:user).permit(:name, :last_name, :address, :email, :career)
  end
end
