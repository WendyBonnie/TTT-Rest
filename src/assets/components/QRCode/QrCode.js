import React, {
  Component,
  Button,
  Fragment,
  useEffect,
  createRef,
  useState,
} from "react";
import QRCode from "qrcode.react";
import { Col, Row } from "react-bootstrap";
import "./QrCode.css";
import QRCODE from "easyqrcodejs";
import { useReactToPrint } from "react-to-print";

function QrHook() {
  const [restaurant, setRestaurant] = useState();
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  //print QR code

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
    "https://back-end.osc-fr1.scalingo.io/client/getMenu?restaurantName=" +
    localStorage.getItem("propsRestaurant");

  useEffect(() => {
    new QRCODE(document.getElementById("qrCodeDivResto"), {
      text: encodeURI(uri),
      width: 100,
      height: 100,
      //title: "Tipourboire", // content
      titleFont: "bold 20px Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      //subTitle: "Votre menu du jour", // content
      subTitleFont: " bold 16px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#4a4a4a", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });

    new QRCODE(document.getElementById("qrCodeDivResto2"), {
      text: encodeURI(uri),
      width: 100,
      height: 100,
      //title: "Tipourboire", // content
      titleFont: "bold 20px Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      //subTitle: "Votre menu du jour", // content
      subTitleFont: " bold 16px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#4a4a4a", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);

  return (
    <div>
      <Row className="backgroundTicketVisibleWeb">
        <Col className="backColLeft">
          <Row className="rowCode">
            <Col>
              <h4 className="titleName">
                {localStorage.getItem("propsRestaurant")}
              </h4>
            </Col>
            <Col className="paddingCode">
              <div id="qrCodeDivResto" />
            </Col>
            <Col>
              <img
                src="/image/tipourboirePhrase.png"
                className="tipPictureWeb"
              />
            </Col>
          </Row>
        </Col>
        <Col className="backColRight">
          <Row className="rowCode2">
            <Col className="col2">
              {" "}
              <img src="/image/logoCode.png" className="tipPictureWeb" />
            </Col>
            <Col className="col2">
              <img src="/image/justeUnMerci.png" className="tipPictureWeb" />
            </Col>
          </Row>
        </Col>
      </Row>
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
                  <div id="qrCodeDivResto2" />
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
                  <img src="/image/justeUnMerci.png" className="tipPicture" />
                </Col>
              </Row>
            </Col>
          </Row>
          {loading && <p className="indicator">impression ...</p>}
        </div>
      </div>

      <button className="buttonQrCode" onClick={handlePrint}>
        Imprimer le QR Code Table
      </button>
    </div>
  );
}

class QrCode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Row className="qrCode">
        <QrHook className="qr" />
      </Row>
    );
  }
}

export default QrCode;
