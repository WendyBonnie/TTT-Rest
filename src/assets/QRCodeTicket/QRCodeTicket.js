import React, { Component, Button, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCodeTicket.css";
import QRCODE from "easyqrcodejs";
import { VscSmiley } from "react-icons/vsc";

import { useReactToPrint } from "react-to-print";

function QrHookTicket(props) {
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  //Print QR code

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
    props.restaurant;

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
      width: 80,
      height: 80,
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
      <Row className="rowCenterWeb">
        <Col className="backgroundTicketVisibleWeb" md={6}>
          <Row>
            <Col>
              <Row className="rowCenterWeb">
                <Col className="borderCol" md={8}>
                  <div id="qrCodeDiv" />
                </Col>
              </Row>
              <Row className="rowMargin">
                <Col md={12}>
                  <span className="text1">Pour donner un pourboire</span>
                </Col>
                <Col md={12}>
                  <span className="textDeux">Scannez le QR Code ci-dessus</span>
                </Col>
                <Col md={12}>
                  <span className="text3">Rapide & 100% sécurisé</span>
                </Col>
              </Row>
              <Row className="rowCenterWeb rowMargin ">
                <Col>
                  <img src="/image/emoticone.png" className="tipPicture" />
                </Col>
              </Row>
              <Row className="rowMargin">
                <Col md={12}>
                  <span className="titleName">
                    {localStorage.getItem("propsRestaurant")}
                  </span>
                </Col>
                <Col className="colThanks" md={12}>
                  <span className="text4Ticket">Vous remercie !</span>
                </Col>
              </Row>
              <Row className="colorRow">
                <Col>
                  <img src="/image/logoticket.png" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="QRPrint">
        <div id="qrCodePdf" ref={componentRef}>
          <Col className="backgroundTicket">
            <Row>
              <Col>
                <Row className="rowCenterWeb">
                  <Col className="borderColPrint">
                    <div id="qrCodeDiv2" />
                  </Col>
                </Row>
                <Row>
                  <Col className="colCenter colMarginWord" md={12}>
                    <span className="text1Print">Pour donner un pourboire</span>
                  </Col>
                  <Col className="colCenter colMargin" md={12}>
                    <span className="textDeuxPrint">
                      Scannez le QR Code ci-dessus
                    </span>
                  </Col>
                  <Col className="colCenter colMarginRap" md={12}>
                    <span className="text3Print">Rapide & 100% sécurisé</span>
                  </Col>
                </Row>
                <Row className="rowCenterWeb colMarginEmo">
                  <Col className="colCenter ">
                    <img src="/image/emoticone.png" className="tipPicture" />
                  </Col>
                </Row>
                <Row>
                  <Col className="colCenter  " md={12}>
                    <span className="titleNamePrint">
                      {localStorage.getItem("propsRestaurant")}
                    </span>
                    <br />
                    <span className="text4">Vous remercie !</span>
                  </Col>
                  <Col className="colCenter " md={12}></Col>
                </Row>
                <Row className="colorRowPrint">
                  <Col>
                    <img src="/image/logoticket.png" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {loading && <p className="indicator">impression ...</p>}
        </div>
      </div>

      <button onClick={handlePrint} className="buttonQrCode">
        Imprimez votre étiquette
      </button>
      {/*<button
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
      </button>*/}
    </div>
  );
}

class QrCodeTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, restaurant: props.restaurant };
  }

  render() {
    return (
      <Row className="qrCode">
        <QrHookTicket className="qr" restaurant={this.state.restaurant} />
      </Row>
    );
  }
}

export default QrCodeTicket;
