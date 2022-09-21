class Api::RestaurantsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_restaurant, only: [:show, :edit, :update, :destroy]

  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = Restaurant.all.order(name: :asc)
    render json: @restaurants
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    if @restaurant
      render json: @restaurant
    else
      render json: @restaurant.errors
    end
  end

  # GET /restaurants/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)


    if @restaurant.save
      render json: @restaurant
    else
      render json: @restaurant.errors
    end
  end

  # PATCH/PUT /restaurants/1
  # PATCH/PUT /restaurants/1.json
  def update
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    @restaurant.destroy

    render json: { notice: 'Restaurant was successfully removed.' }
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_restaurant
    @restaurant = Restaurant.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def restaurant_params
    params.permit(:name)
  end
end
