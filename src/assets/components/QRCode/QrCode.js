import React, { Component, Button } from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCode.css";

class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let uri =
      "https://back-end.osc-fr1.scalingo.io/client/getMenu?restaurantName=" +
      this.props.restaurantName;
    return (
      <Row className="qrCode">
        <QRCode className="qr" value={encodeURI(uri)} size={150} />
      </Row>
    );
  }
}

export default QrCode;
