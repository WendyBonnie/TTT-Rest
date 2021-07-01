import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "./OtherMenu.css";
import storage from "../../../firebase";

class OtherMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: { otherMenu: [] },
    };
  }
  getOtherMenu = () => {
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

  componentDidMount() {
    this.getOtherMenu();
  }

  noMenu = () => {
    if (this.state.menu.otherMenu && this.state.menu.otherMenu.length) {
      return (
        <div>
          <Carousel>{this.display()}</Carousel>
        </div>
      );
    } else {
      return <p>Vous n'avez pas de menu pour l'instant</p>;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const headers = new Headers({
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "POST",
      body: data,
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/menu/add", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseData) => {
          this.setState({ message: responseData.message });
          this.getOtherMenu();
        },
        (err) => {
          console.log(err);
        }
      );
  };

  deleteMenu = (e, index) => {
    e.preventDefault();
    const data = { picture: this.state.menu.otherMenu[index].picture };

    const headers = new Headers({
      "Content-type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/menu/delete",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseData) => {
          this.setState({ message: responseData.message });
          this.getOtherMenu();
        },
        (err) => {
          console.log(err);
        }
      );
  };

  display = () => {
    let contentDisplay = [];
    this.state.menu.otherMenu.map((element, index) => {
      contentDisplay.push(
        <Carousel.Item>
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={"https://back-end.osc-fr1.scalingo.io/" + element.picture}
            />
            <Card.Body>
              <Button
                onClick={(e) => this.deleteMenu(e, index)}
                className="buttonMenuSup"
              >
                Supprimer le menu
              </Button>
            </Card.Body>
          </Card>
        </Carousel.Item>
      );
    });
    return contentDisplay;
  };

  render() {
    return (
      <Container className="menuContain">
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="menu">
            <h2>Mes Menus</h2>
          </Col>
          <Col className="menuOther" md={12}>
            <form onSubmit={this.onSubmit}>
              <input
                type="file"
                name="file"
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button className="buttonMenu" type="submit">
                Valider
              </Button>
            </form>
            {this.noMenu()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OtherMenu;
