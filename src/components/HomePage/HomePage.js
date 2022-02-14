import React, { Component, useEffect, useState } from "react";
import DailyMenu from "../../assets/components/DailyMenu/DailyMenu";
import Profil from "../Profil/Profil";
import QrCode from "../../assets/components/QRCode/QrCode";
import QrCodeTicket from "../../assets/QRCodeTicket/QRCodeTicket";
import Personnel from "../Personnel/Personnel";

import {
  Image,
  Col,
  Row,
  Container,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import "./HomePage.css";

function Tuto() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="buttonTuto" onClick={handleShow}>
        Etapes obligatoires{" "}
        <Button onClick={handleShow} className="flecheTuto">
          {">"}
        </Button>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Rappel d'utilisation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="title1">
            Pour que vos clients puissent donner des pourboires selon vos
            règles,
            <br /> vous devez:
          </p>
          <p className="para1">
            Mettre en évidence les QR Codes Tipourboire dans votre restaurant
            <br /> <br />
            QR Code addition
            <br />
            Insérez-le sur votre ticket d'addition avec votre logiciel de caisse
            <br />
            et/ou
            <br />
            Imprimez-le et mettez-le en évidence
            <br />
            à la caisse, sur le TPE, le support de l'addition, etc...
            <br /> <br />
            QR Code Menu du jour
            <br />
            Imprimez le et mettez-le sur chaque table, <br />
          </p>
          <p className="title1">
            Pour que vos équipes puissent recevoir des pourboires selon vos
            règles,
            <br /> vous devez:
          </p>
          <p className="para1">
            Demander à chaque personne de votre équipe (serveur, cuisinier,
            plongeur, chef de rang, commis, runner, etc...) de créer son compte
            sur serveur.tipourboire.com
            <br /> <br />
            Leur envoyer à chacun un mail d'affiliation depuis votre espace
            Tipourboire, pour qu'il soit rattaché à votre établissement.
            <br /> <br />
            Envoyer à la personne en charge de la distribution des pourboires
            (alias "le serveur référant"), un mail d'affiliation depuis votre
            espace Tipourboire, pour qu'il puisse distribuer le pourboire commun
            selon vos règles
            <br />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modalButton"
            variant="secondary"
            onClick={handleClose}>
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
    this.state = {
      restaurantName: "",
      isLoading: false,
      data: { abonne: false },
    };
  }

  handleAfterPrint = () => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  };

  handleBeforePrint = () => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  };

  handleOnBeforeGetContent = () => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    this.setState({ text: "Loading new text...", isLoading: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState(
          { text: "New, Updated Text!", isLoading: false },
          resolve
        );
      }, 2000);
    });
  };

  reactToPrintTrigger = () => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print </button>;
  };

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
          localStorage.setItem(
            "propsRestaurant",
            JSON.stringify(responseObject.restaurantName)
          );
          this.setState({ restaurantName: responseObject.restaurantName });
          this.setState({ abonne: responseObject.abonne });
          this.setState({ data: JSON.stringify(responseObject) });
          console.log("abonne", this.state.data);
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
            }}>
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
            }}>
            Souscrire à l'abonnement premium <br />
          </button>
        </div>
      );
    }
  };

  isSubscribed = () => {
    console.log("abonne state", this.state.abonne);
    if (this.state.data.abonne === false) {
      return (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      );
    }
    return;
  };

  componentDidMount() {
    this.getRestaurantName();
    // this.isSubscribed();
  }

  render() {
    return (
      <div className="homepage">
        <Row className="rowGlobal">
          <Col md={10}>
            <Personnel className="personnel" />
            <div className="titleQR">{this.renderButtonSub()}</div>
            <h1 className="titleQR">Mes QR Codes</h1>

            <Row className="rowGlobal">
              <Col md={{ span: 9, offset: 7 }} className="colTuto">
                <Tuto />
              </Col>
              <Row className="rowGlobal">
                <Col xs={12} s={12} md={6}>
                  <p className="titleQR">QR CODE Ticket </p>
                  <p className="qrSub">
                    à insérer sur vos tickets d'addition depuis votre logiciel
                    de caisse
                  </p>
                  <div>
                    <QrCodeTicket
                      className="qrCodeTicket"
                      restaurantName={this.state.restaurantName}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="rowGlobal">
                <Col xs={12} s={12} md={6}>
                  <p className="titleQR"> QR CODE Menu </p>
                  <p className="qrSub">
                    à imprimer et coller sur les tables de votre restaurant
                  </p>
                  <QrCode
                    className="qrCode"
                    restaurantName={this.state.restaurantName}
                    restaurant="coucou"
                  />
                </Col>
              </Row>
            </Row>
          </Col>
          <Row className="rowGlobal">
            <Col md={6}>
              <DailyMenu className="menuhome" />
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default HomePage;
