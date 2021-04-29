import React, { Component } from "react";
import DailyMenu from "../../assets/components/DailyMenu/DailyMenu";
import Profil from "../Profil/Profil";
import QrCode from "../../assets/components/QRCode/QrCode";
import QrCodeTicket from "../../assets/QRCodeTicket/QRCodeTicket";
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

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/profil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          localStorage.setItem(
            "propsRestaurant",
            JSON.stringify(responseObject.restaurantName)
          );
          this.setState({ restaurantName: responseObject.restaurantName });
          this.setState({ abonne: responseObject.abonne });
          console.log(
            "consolelog",
            JSON.parse(localStorage.getItem("propsRestaurant"))
          );
        },

        (error) => {
          console.log(error);
        }
      );
  };
  renderButtonSub = () => {
    if (this.state.abonne === true) {
      return (
        <div>
          <button
            className="buttonPremium"
            variant="primary"
            onClick={() => {
              this.props.history.push("/dataClient");
            }}
          >
            Accès à mon espace premium <br />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="buttonPremium"
            variant="primary"
            onClick={() => {
              this.props.history.push("/abonnement");
            }}
          >
            Souscrire à l'abonnement premium <br />
          </button>
        </div>
      );
    }
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
            <div className="titleQR">{this.renderButtonSub()}</div>
            <h1 className="titleQR">Mes QR Codes</h1>

            <Row>
              <Col>
                <p className="titleQR">QR CODE Ticket </p>
                <p className="qrSub">
                  à insérer sur vos tickets d'addition depuis votre logiciel de
                  caisse
                </p>
                <QrCodeTicket
                  className="qrCodeTicket"
                  restaurantName={this.state.restaurantName}
                />
              </Col>
              <Col>
                <p className="titleQR"> QR CODE Menu </p>
                <p className="qrSub">
                  à imprimer et coller sur les tables de votre restaurant
                </p>
                <QrCode
                  className="qrCode"
                  restaurantName={this.state.restaurantName}
                />
              </Col>
            </Row>
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
