import React, { Component, Button, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCodeTicket.css";
import QRCODE from "easyqrcodejs";

function QrHookTicket() {
  const [restaurant, setRestaurant] = useState();
  let uri =
    "https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=" +
    JSON.parse(localStorage.getItem("propsRestaurant"));
  useEffect(() => {
    console.log("dsqdsq", JSON.parse(localStorage.getItem("propsRestaurant")));
    new QRCODE(document.getElementById("qrCodeTicketRef"), {
      text: encodeURI(uri),
      width: 200,
      height: 200,
      title: "TIPOURBOIRE", // content
      titleFont: "bold 18px Arial", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      subTitle: "Scannez, Donnez avec Tipourboire.", // content

      subTitleFont: "12px Arial", // font. default is "14px Arial"
      subTitleColor: "#f5a624", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);
  return <div id="qrCodeTicketRef" />;
}
class QrCodeTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row className="qrCode">
        <QrHookTicket className="qr" />
      </Row>
    );
  }
}

export default QrCodeTicket;
