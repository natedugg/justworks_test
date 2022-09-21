import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddReservationModal from "./AddReservationModal";

class Reservations extends React.Component {

  state = {
    reservations: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const url = "api/restaurants/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((restaurants) => {
        this.restaurants = restaurants;
        this.loadReservations();
      })
      .catch((err) => message.error("Error: " + err));
  };

  loadReservations = () => {
    const url = "api/reservations/index";
    const getRestaurantById = restaurant_id => {
      const restaurant = this.restaurants && this.restaurants.find(({ id }) => id === restaurant_id);

      return restaurant?.name;
    };
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((reservation) => {
          const newEl = {
            key: reservation.id,
            id: reservation.id,
            restaurant: getRestaurantById(reservation.restaurant_id),
            party_size: reservation.party_size,
            reservation_date: reservation.reservation_date,
            reservation_slot: reservation.reservation_slot,
            party_name: reservation.party_name,
            contact_phone: reservation.contact_phone,
            contact_email: reservation.contact_email,
          };
          console.log("")
          this.setState((prevState) => ({
            reservations: [...prevState.reservations, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  columns = [
    {
      title: "Restaurant",
      dataIndex: "restaurant",
      key: "restaurant",
    },
    {
      title: "Party Name",
      dataIndex: "party_name",
      key: "party_name",
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
    },
    {
      title: "Reservation Date",
      dataIndex: "reservation_date",
      key: "reservation_date",
    },
    {
      title: "Reservation Time",
      dataIndex: "reservation_slot",
      key: "reservation_slot",
    },
    {
      title: "Contact Phone",
      dataIndex: "contact_phone",
      key: "contact_phone",
    },
    {
      title: "Contact Email",
      dataIndex: "contact_email",
      key: "contact_email",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm
          title="Are you sure delete this reservation?"
          onConfirm={() => this.deleteReservation(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  reloadReservations = () => {
    this.setState({ reservations: [] });
    this.loadData();
  };

  deleteReservation = (id) => {
    const url = `api/reservations/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadReservations();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Table
          className="table-striped-rows"
          dataSource={this.state.reservations}
          columns={this.columns}
          pagination={{ pageSize: 5 }}
        />

        <AddReservationModal reloadReservations={this.reloadReservations} />
      </>
    );
  }
}

export default Reservations;
