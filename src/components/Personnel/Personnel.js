import React, { Component, Form, Label, Input } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import "@brainhubeu/react-carousel/lib/style.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "./Personnel.css";
import Icon from "react-fa";
class Personnel extends Component {
  constructor(props) {
    super(props);
    this.state = { serveur: { tabServeur: [] }, email: "" };
  }
  getWaiterList = () => {
    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:8080/restaurateur/management/waiter-list", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ serveur: data });
          console.log(this.state.serveur);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  renderMesServeurs = () => {
    return this.state.serveur.tabServeur.map((element) => {
      return (
        <div className="serveurDiv">
          <p className="serveurP">{element.serveurName}</p>
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
                "http://localhost:8080/restaurateur/management/waiter-delete",
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
            }}
          >
            X
          </button>
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
      nom: this.state.nom,
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
        this.setState({ message: responseData.message });
      });
  };
  addReferent = (e) => {
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

    fetch("http://localhost:8080/restaurateur/management/referent", options)
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.setState({ message: responseData.message });
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
            clickToChange
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
            }}
          >
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
            <h2 className="title-container">Gestion de mon équipe</h2>
          </Col>
        </Row>
        <Row>
          <Col className="colAffiliation">
            <Col md={12}>
              <label className="demandeAffiliation">
                Demande d'affiliation
              </label>
            </Col>
            <input
              type="text"
              name="email"
              onChange={this.handleInput}
              placeholder="Email du serveur"
              className="inputAffi"
            />

            <input
              type="submit"
              value="Envoyer"
              onClick={this.addAffiliation}
              className="button"
            />
            <Col md={12}>
              <label className="demandeAffiliation">
                Création compte référent pour le pourboire commun
              </label>
            </Col>
            <input
              type="text"
              name="email"
              onChange={this.handleInput}
              placeholder="Email du serveur"
              className="inputAffi"
            />

            <input
              type="submit"
              value="Envoyer"
              onClick={this.addReferent}
              className="button"
            />
            <br />
            {this.state.message}
          </Col>
        </Row>
        <h2 className="titleWaiter">Votre équipe </h2>
        {this.crew()}
      </Container>
    );
  }
}

export default Personnel;
