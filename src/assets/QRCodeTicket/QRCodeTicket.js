import React, { Component, Button, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCodeTicket.css";
import QRCODE from "easyqrcodejs";
import qrcode from "qrcode.react";
import QrCode from "../components/QRCode/QrCode";

function QrHookTicket() {
  let uri =
    "https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=" +
    localStorage.getItem("propsRestaurant");

  useEffect(() => {
    new QRCODE(document.getElementById("qrCodeDiv"), {
      text: encodeURI(uri),
      width: 200,
      height: 200,
      title: "Tipourboire", // content
      titleFont: "bold 20px  Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      subTitle: "Scannez & Donnez ", // content
      subTitleFont: "bold 16px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#4a4a4a", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);
  return (
    <div>
      <div id="qrCodeDiv" />
      <button
        className="buttonQrCode"
        onClick={() => {
          const canvas = document.querySelector("#qrCodeDiv canvas");
          const image = canvas.toDataURL();
          const element = document.createElement("a");
          element.setAttribute("href", image);
          element.setAttribute("download", "canvas.png");
          document.body.appendChild(element);
          element.click();
        }}
      >
        Télécharger le QR Code Ticket
      </button>
    </div>
  );
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
