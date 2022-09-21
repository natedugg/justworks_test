class Api::ReservationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_reservation, only: [:show, :edit, :update, :destroy]

  # GET /reservations
  # GET /reservations.json
  def index
    @reservations = Reservation.all.order(reservation_date: :desc)
    render json: @reservations
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
    if @reservation
      render json: @reservation
    else
      render json: @reservation.errors
    end
  end

  # GET /reservations/new
  def new
    @reservation = Reservation.new
  end

  # GET /reservations/1/edit
  def edit
  end

  # POST /reservations
  # POST /reservations.json
  def create
    @reservation = Reservation.new(reservation_params)


    if @reservation.save
      render json: @reservation
    else
      render json: @reservation.errors
    end
  end

  # PATCH/PUT /reservations/1
  # PATCH/PUT /reservations/1.json
  def update
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    @reservation.destroy

    render json: { notice: 'Reservation was successfully removed.' }
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_reservation
    @reservation = Reservation.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def reservation_params
    params.permit(:restaurant_id, :party_size, :reservation_date, :reservation_slot, :party_name, :contact_phone, :contact_email, :reservation)
  end
end
