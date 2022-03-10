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
        keyboard={false}
      >
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
            Ajoutez vos bénéficiaires et/ou désignez votre référent selon la
            distribution choisie
            <br />
            <br />
            Demandez à chaque personne de votre équipe de valider sa création de
            compte à réception de votre mail
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
            <br /> Sur le comptoir
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
    this.state = {
      restaurantName: "",
      isLoading: false,
      data: {},
      pourboireGeneral: "",
      tabServeur: [],
      show: false,
      email: "",
      menu: {},
    };
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal = () => {
    this.setState({ show: false });
    console.log("this", this.state.show);
  };

  isReferent = () => {
    console.log(
      "test",
      this.state.pourboireGeneral === true,
      this.state.tabServeur.length === 0
    );
    if (
      this.state.pourboireGeneral === true &&
      this.state.tabServeur.length === 0
    ) {
      this.setState({ show: true });
    } else {
      return null;
    }
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addAffiliation = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/management/affiliation",
      options
    )
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.hideModal();
        if (responseData === true) {
          console.log("hello");

          alert("Votre demande a bien été prise en compte");
        } else {
          alert(responseData.messageAffi);
        }
      });
  };

  modalReferent = () => {
    return (
      <Modal
        show={this.state.show}
        onHide={false}
        animation={true}
        backdrop={true}
        keyboard={false}
        style={{ overlay: { zIndex: 3 } }}
      >
        <Modal.Header>
          <Modal.Title>Désigner votre référent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="affiPop">
            <Col s={12} md={12}>
              <p>
                Saisissez ci-dessous le mail de la personne <br />
                qui sera en charge de répartir le pot selon les modalités
                choisies
              </p>
            </Col>
            <Col>
              <input
                type="text"
                name="email"
                onChange={this.handleInput}
                placeholder="Bénéficiaire"
                className="inputAffi"
              />
              <input
                type="submit"
                value="Envoyer la demande"
                onClick={this.addAffiliation}
                className="button"
              />
            </Col>
            <Col s={12} md={12}>
              <p>
                À réception du mail, le référent pourra commencer à répartir.
              </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  };

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
          this.setState({
            restaurantName: responseObject.restaurantName,
          });
          this.setState({ pourboireGeneral: responseObject.pourboireGeneral });
          this.setState({ tabServeur: responseObject.tabServeur });
          this.setState({ menu: responseObject.menu.dailyMenu.picture });

          // this.setState({ abonne: responseObject.abonne });
          this.setState({ data: JSON.stringify(responseObject) });
          if (
            responseObject.pourboireGeneral === true &&
            responseObject.tabServeur.length === 0
          ) {
            this.setState({ show: !this.state.show });
          } else {
            this.setState({ show: false });
          }
        },

        (error) => {
          console.log(error);
        }
      );
  };
  // renderButtonSub = () => {
  //   if (this.state.abonne === true) {
  //     return (
  //       <div>
  //         <button
  //           className="buttonPremium"
  //           variant="primary"
  //           onClick={() => {
  //             this.props.history.push("/dataClient");
  //           }}>
  //           Accès à mon espace premium <br />
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <button
  //           className="buttonPremium"
  //           variant="primary"
  //           onClick={() => {
  //             this.props.history.push("/abonnement");
  //           }}>
  //           Souscrire à l'abonnement premium <br />
  //         </button>
  //       </div>
  //     );
  //   }
  // };

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

            <h1 className="titleQR">Mes QR Codes</h1>

            <Row className="rowGlobal">
              <Col md={{ span: 9, offset: 7 }} className="colTuto">
                {this.modalReferent()}
                <Tuto />
              </Col>
              <Row className="rowGlobal">
                <Col xs={9} s={9} md={6}>
                  <p className="titleQR">
                    <strong> QR CODE Pourboire de votre établissement</strong>
                  </p>
                  <p className="qrSub">
                    À télécharger pour impression sur vos supports ou insertion
                    dans votre logiciel de caisse ou d'encaissement
                  </p>
                  <div>
                    <QrCodeTicket />
                  </div>
                </Col>

                <Col xs={9} s={9} md={6}>
                  <p className="titleQR">
                    {" "}
                    <strong>QR CODE Carte</strong>{" "}
                  </p>
                  <p className="qrSub">
                    À télécharger pour impression
                    <br />
                    et mise à disposition au sein de votre établissement
                  </p>

                  <QrCode />
                </Col>
              </Row>
            </Row>
          </Col>
          <Row className="rowGlobal marginToop">
            <Col className="centerCol" md={3}>
              <DailyMenu className="menuhome" />
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default HomePage;
