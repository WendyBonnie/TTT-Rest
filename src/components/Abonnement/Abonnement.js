import React, { Component } from "react";

import { Container } from "react-bootstrap";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./Abonnement.css";

import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_live_51HAxRlHoh2Vgz5Qdxu3AGz9GC1q2B453vaXplDn3J0Q5wXRCZqwkuoCG5O1Nsr1VsbNIHmjVWj7XJo9cZmljPw7L00wQbxBO6Y"
);

class Abonnement extends Component {
  render() {
    return (
      <Container className="monAbonnement">
        <Row className="infoAbonnement">
          <Col>
            <h3>Votre abonnement premium restaurateur Tipourboire</h3>
            <Elements className="cbInput" stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Abonnement;
