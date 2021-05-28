import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


import "./DailyMenu.css";
import { Link } from "react-router-dom";

class DailyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      menu: { dailyMenu: { picture: "", label: "" } },
      image: null,
      progress:0,
      downloadURL: null
    
    };
  }

  delete = (e) => {
    window.confirm("Etes-vous sur de vouloir supprimer le menu du jour ?");
    e.preventDefault();
    const data = {
      dailyMenu: this.state.menu.dailyMenu,
    };
    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/dailymenu/delete",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseData) => {
          this.setState({ message: responseData.message });
          this.getDailyMenu();
        },
        (err) => {
          console.log(err);
        }
      );
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: data,
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/dailymenu/add",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseData) => {
          this.setState({ message: responseData.message });
          console.log(data)
          this.getDailyMenu();

          
        },
        (err) => {
          console.log(err);
        }
      );
  };

 
  getDailyMenu = () => {
    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/menu", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ menu: data.menu });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  noMenu = () => {
    if (
      this.state.menu.dailyMenu.picture == "" &&
      this.state.menu.dailyMenu.label == ""
    ) {
      return <p>Vous n'avez pas de menu du jour</p>;
    } else {
      return (
        <Card.Img
          variant="top"
          src={
            "https://back-end.osc-fr1.scalingo.io/" +
            this.state.menu.dailyMenu.picture
          }
          className="dailyMenu"
          alt="Menu du Jour"
        />
      );
    }
  };
  componentDidMount() {
    this.getDailyMenu();
  }

  render() {
    return (
      <Container className="dailyMenuContain">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Link className="linkButton" to="/menus">
              <h1 className="menujour">Menu du Jour</h1>
            </Link>
          </Col>
          <Col className="colMenu" md={12}>
            <form className="formMenu" onSubmit={this.onSubmit}>
              <input className="button" type="file" name="file" />

              <button className="bouton" type="submit">
                Valider
              </button>
            </form>

            {this.noMenu()}
            <Card.Body classNam="cardsupp">
              <p>{this.state.menu.dailyMenu.label}</p>
              <button
                className="boutonSupprimer"
                type="submit"
                onClick={this.delete}
              >
                Supprimer le menu
              </button>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DailyMenu;
