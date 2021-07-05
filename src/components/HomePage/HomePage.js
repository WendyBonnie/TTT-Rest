import React, { Component, useEffect, useState } from "react";
import DailyMenu from "../../assets/components/DailyMenu/DailyMenu";
import Profil from "../Profil/Profil";
import QrCode from "../../assets/components/QRCode/QrCode";
import QrCodeTicket from "../../assets/QRCodeTicket/QRCodeTicket";
import Personnel from "../Personnel/Personnel";

import { Image, Col, Row, Container, Button, Modal } from "react-bootstrap";
import "./HomePage.css";

function Tuto() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="buttonTuto" onClick={handleShow}>
        Etape obligatoire{" "}
        <Button onClick={handleShow} className="flecheTuto">
          {">"}
        </Button>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Rappel d'utilisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image className="imgModalTuto" src="/images/logoOK.png" />
          <li>
            {" "}
            1. Demandez à chaque personne de votre équipe de créer un compte sur
            serveur.tipourboire.com
          </li>
          <br /> <br />
          <li>
            {" "}
            2. Envoyez un mail d'affiliation à chacun depuis votre espace
            Tipourboire et à votre serveur référant en cas de distribution à la
            générale.
          </li>
          <br /> <br />
          <p>
            3. Mettez en évidence les QR Codes Tipourboire dans votre restaurant
            ; <br /> <br />
            - QR Code addition Insérez-le sur votre ticket d'addition avec votre
            logiciel de caisse Imprimez-le et mettez-le en évidence à la caisse,
            sur le TPE, le support de l'addition, etc...
            <br /> - QR Code Menu du jour Imprimez le et mettez-le sur chaque
            table.
          </p>
          <p></p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modalButton"
            variant="secondary"
            onClick={handleClose}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
              <Col md={{ span: 9, offset: 7 }} className="colTuto">
                <Tuto />
              </Col>
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
