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
          <Modal.Title>Comment activer votre compte ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="title1">
            Veillez à avoir effectuer les actions suivantes afin de permettre à
            vos clients de donner des pourboires
          </p>
          <p className="para1">
            Définissez les paramètres de redistribution : collectif ou
            individuel
            <br />
            Ajouter vos bénéficiaires et/ou désigner votre référent selon la
            distribution choisie
            <br />
            <br />
            Demandez à chaque personne de votre équipe de valider sa création de
            compteà réception de votre mail
            <br />
            <br />
            En cas de non réception, pensez à leur demander de vérifier les
            courriers indésirables.
            <br /> <br />
            Le bénéficiaire peut aussi directement créer un compte et être
            rattaché par la suite à votre établissement. (notamment si cette
            personne travaille dans plusieurs établissements utilisant
            Tipourboire.)
            <br />
          </p>

          <p className="title1">
            Et pensez à mettre en avant votre QR Code pour booster vos
            pourboires !
          </p>
          <p className="para1">
            Imprimez et mettez en évidence votre QR Code pour permettre au plus
            grand nombre de le flasher
            <br />
            sur des présentoirs dans votre établissement
            <br /> sur le comptoir
            <br />
            A côté de votre caisse
            <br />
            Sur votre TPE
            <br />
            Sur votre ticket de caisse
            <br />
            Ou encore dans vos coupelles ou sur vos cartes
            <br />
            tous les supports sont bons
            <br />
            pour capter l'attention !
            <br />
            <br />
            ET avec QR carte
            <br />
            Mettez à disposition votre carte après l'avoir simplement prise en
            photo
            <br />
            et chargée dans votre espace :
            <br />
            simple et efficace !
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
