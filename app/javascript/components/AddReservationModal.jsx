import {Button, Form, Input, message, Modal, Select} from "antd";
import React from "react";

const { Option } = Select;

class AddReservationModal extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  componentDidMount() {
    this.loadRestaurants();
  }

  loadRestaurants = () => {
    const url = "api/restaurants/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((restaurant) => {
          const newEl = {
            key: restaurant.id,
            id: restaurant.id,
            name: restaurant.name,
          };

          this.setState((prevState) => ({
            restaurants: [...(prevState.restaurants || []), newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  restaurantOptions = () => {
    const { restaurants = [] } = this.state;

    return restaurants.length > 0
      && restaurants.map((item, i) => {
        return (
          <option key={i} value={item.id}>{item.name}</option>
        )
      }, this);
  };

  onFinish = (values) => {
    const url = "api/reservations/create";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          this.handleCancel();

          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        this.props.reloadReservations();
      })
      .catch((err) => console.error("Error: " + err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" className="create-reservation" onClick={this.showModal}>
          Create New +
        </Button>

        <Modal
          title="Add New Reservation ..."
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="restaurant_id"
              label="Restaurant"
              rules={[
                {
                  required: true,
                  message: "Please select your restaurant",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select your restaurant"
                optionFilterProp="children"
                style={{ width: "100%" }}
              >
                {this.restaurantOptions()}
              </Select>
            </Form.Item>

            <Form.Item
              name="party_name"
              label="Party Name"
              rules={[
                { required: true, message: "Please input your party name." },
              ]}
            >
              <Input placeholder="Input your party name." />
            </Form.Item>

            <Form.Item
              name="party_size"
              label="Party Size"
              rules={[
                { required: true, message: "Please input your party size." },
              ]}
            >
              <Input type="number" placeholder="Input your party size." />
            </Form.Item>

            <Form.Item
              name="reservation_date"
              label="Reservation Date"
              rules={[
                { required: true, message: "Please choose your reservation date." },
              ]}
            >
              <Input placeholder="Input your your reservation date." />
            </Form.Item>

            <Form.Item
              name="reservation_slot"
              label="Reservation Time"
              rules={[
                { required: true, message: "Please choose your reservation time." },
              ]}
            >
              <Input placeholder="Input your your reservation time." />
            </Form.Item>

            <Form.Item
              name="contact_phone"
              label="Contact Phone"
              rules={[
                { required: true, message: "Please input your contact phone." },
              ]}
            >
              <Input placeholder="Input your contact phone." />
            </Form.Item>

            <Form.Item
              name="contact_email"
              label="Contact Email"
              rules={[
                { required: true, message: "Please input your contact email." },
              ]}
            >
              <Input placeholder="Input your contact email." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddReservationModal;
