import React, { Component } from "react";

import { Container } from "react-bootstrap";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./Abonnement.css";

import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HAxRlHoh2Vgz5QdMpHXhINQMDhyGPR4gFvzs9vVzocySBI4WCfw8oPa7De6PC2ZJZlQKVQFRDPLU7FIGmXZC0QA00XGutN1eU"
);

class Abonnement extends Component {
  render() {
    return (
      <Container className="monAbonnement">
        <Row className="infoAbonnement">
          <Col>
            <h3>Votre abonnement premium restaurateur TipPourBoire</h3>
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
