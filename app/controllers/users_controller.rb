class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
  end

  private

  def user_params
    params.require(:user).permit(:name, :last_name, :address, :email, :career, :won)
  end
end
