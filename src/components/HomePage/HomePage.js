import React, { Component } from "react";
import DailyMenu from "../../assets/components/DailyMenu/DailyMenu";
import Profil from "../Profil/Profil";
import QrCode from "../../assets/components/QRCode/QrCode";
import Personnel from "../Personnel/Personnel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurantName: "" };
  }
  getRestaurantName = () => {
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),

      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:8080/restaurateur/profil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ restaurantName: responseObject.restaurantName });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  componentDidMount() {
    this.getRestaurantName();
  }

  render() {
    return (
      <div className="homepage">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Personnel className="personnel" />
            <h2 className="titleQR">Votre QR Code </h2>
            <QrCode restaurantName={this.state.restaurantName} />
          </Col>
          <Col md={{ span: 6, offset: 3 }}>
            <DailyMenu className="menuhome" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
