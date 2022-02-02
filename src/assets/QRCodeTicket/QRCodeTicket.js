import React, { Component, Button, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCodeTicket.css";
import QRCODE from "easyqrcodejs";

import { useReactToPrint } from "react-to-print";

function QrHookTicket(props) {
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  let uri =
    "https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=" +
    localStorage.getItem("propsRestaurant");

  useEffect(() => {
    new QRCODE(document.getElementById("qrCodeDiv"), {
      text: encodeURI(uri),
      width: 100,
      height: 100,
      //title: "Tipourboire", // content
      titleFont: "bold 20px  Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      //subTitle: "Scannez & Donnez ", // content
      subTitleFont: "bold 16px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#4a4a4a", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });

    new QRCODE(document.getElementById("qrCodeDiv2"), {
      text: encodeURI(uri),
      width: 100,
      height: 100,
      //title: "Tipourboire", // content
      titleFont: "bold 20px  Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      //subTitle: "Scannez & Donnez ", // content
      subTitleFont: "bold 16px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#4a4a4a", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);

  return (
    <div>
      <div id="qrCodeDiv" />
      <div className="QRPrint">
        <div id="qrCodePdf" ref={componentRef}>
          <Row className="backgroundTicket">
            <Col>
              <Row className="rowCode">
                <Col>
                  <p className="titleName">
                    {localStorage.getItem("propsRestaurant")}
                  </p>
                </Col>
                <Col>
                  <div id="qrCodeDiv2" />
                </Col>
                <Col>
                  <img
                    src="/image/tipourboirePhrase.png"
                    className="tipPicture"
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="rowCode2">
                <Col className="col2">
                  {" "}
                  <img src="/image/logoCode.png" className="tipPicture" />
                </Col>
                <Col className="col2">
                  <p>Juste pour un merci</p>
                </Col>
              </Row>
            </Col>
          </Row>
          {loading && <p className="indicator">impression ...</p>}
        </div>
      </div>

      <button onClick={handlePrint} className="buttonQrCode">
        Imprimez votre étiquette
      </button>
      <button
        className="buttonQrCode"
        onClick={() => {
          const canvas = document.querySelector("#qrCodePdf canvas");
          const image = canvas.toDataURL();
          const element = document.createElement("a");
          element.setAttribute("href", image);
          element.setAttribute("download", "canvas.png");
          document.body.appendChild(element);
          element.click();
        }}>
        Télécharger le QR Code Ticket
      </button>
    </div>
  );
}

class QrCodeTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
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
