import React, { Component, Form, Label, Input } from "react";
import { Row, Col, Button, Container, Image } from "react-bootstrap";
import "@brainhubeu/react-carousel/lib/style.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "./Personnel.css";
import Icon from "react-fa";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
class Personnel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serveur: { tabServeur: [], referent: {} },
      email: "",
      modalReferent: false,
      indexRef: 0,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  popupModal = () => {
    const handleClose = () => this.setState({ modalReferent: false });
    console.log("indexRef", this.state.indexRef);
    console.log(
      "ndex",
      this.state.serveur.tabServeur[this.state.indexRef]?.serveurMail
    );

    return (
      <>
        <Modal show={this.state.modalReferent} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#f5a624" }}>Tipourboire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="modalPopup">
              <h4>
                Ajout d'un référent dans votre établissement un mail lui sera
                envoyé
              </h4>

              <span className="textePopup">
                Etes vous sur de vouloir ajouter{" "}
              </span>

              <button
                onClick={() => {
                  this.addReferent(
                    this.state.serveur.tabServeur[this.state.indexRef]
                      .serveurMail
                  );
                }}>
                Oui
              </button>
              <button>Non</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  hideModal = () => {
    this.setState({ modalReferent: false });
  };

  getWaiterList = () => {
    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/management/waiter-list",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          console.log("data", data);
          this.setState({ serveur: data });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  renderMesServeurs = () => {
    return this.state.serveur.tabServeur.map((element, index) => {
      console.log(
        "element",
        element.serveurMail,
        "serveur",
        this.state.serveur
      );
      return (
        <div className="serveurDiv">
          <p className="serveurP">{element.serveurName}</p>
          <p className="serveurN">{element.serveurLastName}</p>

          <Image
            className="serverPicture"
            src={
              "https://s3.amazonaws.com/b.c.bucket.tipourboire/" +
              element.serveurPicture
            }
            roundedCircle
          />
          <br></br>
          <button
            className="button"
            onClick={() => {
              const data = {
                mail: element.serveurMail,
              };

              const headers = new Headers({
                "Content-Type": "application/json",
                Authorization: "bearer " + localStorage.getItem("token"),
              });

              const options = {
                method: "DELETE",
                headers: headers,
                body: JSON.stringify(data),
              };

              fetch(
                "https://back-end.osc-fr1.scalingo.io/restaurateur/management/waiter-delete",
                options
              )
                .then((response) => {
                  return response.json();
                })

                .then(
                  (data) => {
                    this.getWaiterList();
                  },

                  (err) => {
                    console.log(err);
                  }
                );
            }}>
            Supprimer
          </button>
          <br />

          {this.state.serveur?.referent?.email === element.serveurMail ? (
            <button
              className="buttonRef"
              onClick={() => {
                console.log("je suis ref");
              }}>
              Je suis le référent
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                console.log("je ne suis pas référent");
                this.setState({ indexRef: index });
                this.setState({ modalReferent: true });
              }}>
              Je ne suis pas le référent
            </button>
          )}
          {/* <button
            className="button"
            onClick={() => {
              if (this.state.serveur.referent.email == element.serveurMail) {
                console.log("je suis ref");
              } else {
                console.log("je ne suis pas référent");
                this.setState({ indexRef: index });
                this.setState({ modalReferent: true });
              }
            }}>
            {this.state.serveur.referent.email == element.serveurMail
              ? "Je suis le referent"
              : "Faire de moi le référent"}
            </button>*/}
        </div>
      );
    });
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

    fetch("http://localhost:8080/restaurateur/management/affiliation", options)
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        console.log(responseData);
        if (responseData === true) {
          alert("Votre demande a bien été prise en compte");
        } else {
          alert(responseData.messageAffi);
        }
      });
  };
  addReferent = (e) => {
    console.log(
      "test",
      this.state.serveur?.tabServeur[this.state.indexRef]?.serveurMail
    );
    //e.preventDefault();
    const data = {
      email: this.state.serveur?.tabServeur[this.state.indexRef]?.serveurMail,
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
      "https://back-end.osc-fr1.scalingo.io/restaurateur/management/referent",
      options
    )
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.setState({ message: responseData.message });
      })
      .then(() => {
        this.hideModal();
      });
  };
  componentDidMount() {
    this.getWaiterList();
  }

  crew = () => {
    if (!this.state.serveur) {
      return (
        <p className="affiliation">Vous n'avez pas de personnel affilié</p>
      );
    } else {
      return (
        <Col className="crewStyle">
          <Carousel
            slidesPerPage={5}
            slidesPerScroll={1}
            centered
            infinite={true}
            breakpoints={{
              1000: {
                // these props will be applied when screen width is less than 1000px
                slidesPerPage: 0,
                clickToChange: false,
                centered: false,
              },
              500: {
                slidesPerPage: 1,
                slidesPerScroll: 1,
                clickToChange: false,
                centered: false,

                animationSpeed: 2000,
                infinite: false,
              },
            }}>
            {this.renderMesServeurs()}
          </Carousel>
        </Col>
      );
    }
  };

  render() {
    return (
      <Container className="container personnel">
        <Row>
          <Col>
            <Link className="linkButton" to="/equipe">
              <h1 className="title-container">Gestion de mon équipe</h1>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="colAffiliation">
            <Col md={12}>
              <label className="demandeAffiliation">
                Ajouter un bénéficiaire dans mon équipe
              </label>
            </Col>
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
            <p className="infoAffi">
              "Si votre bénéficiaire n'est pas encore inscrit sur la plateforme
              Tipourboire, il recevra un mail afin de valider son inscription
              est compléter son compte. Le bénéficiaire doit valider votre
              demande afin d'être référencé dans votre équipe. Vous pourrez
              alors le visualiser"
            </p>
            {this.state.messageAffi}
          </Col>
        </Row>
        <h1 className="titleWaiter">Mon équipe </h1>
        {this.crew()}
        {this.popupModal()}
      </Container>
    );
  }
}

export default Personnel;
