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
import { VscSmiley } from "react-icons/vsc";
let uri = `https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=${localStorage.getItem(
  "propsRestaurant"
)}`;

function QrHook(props) {
  const [restaurant, setRestaurant] = useState();
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const getRestaurantName = () => {
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),

      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/profil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          localStorage.setItem("resto", responseObject.restaurantName);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setTimeout(() => {
      getRestaurantName();
    }, 500);

    setTimeout(() => {
      new QRCODE(document.getElementById("qrCodeDivResto"), {
        text: `https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=${JSON.stringify(
          localStorage.getItem("resto")
        )}`,
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
        text: `https://back-end.osc-fr1.scalingo.io/client/getMenuTicket?restaurantName=${JSON.stringify(
          localStorage.getItem("resto")
        )}`,
        width: 83,
        height: 83,
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
    }, 1000);
  }, []);

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

  return (
    <div>
      <Row className="rowCenterWeb">
        <Col className="backgroundTicketVisibleWebCarte" md={6}>
          <Row className="rowMarginCard">
            <Col>
              <Row className="rowCenterWeb">
                <Col className="borderCol" md={8}>
                  <div id="qrCodeDivResto" />
                </Col>
              </Row>
              <Row className="rowMargin">
                <Col md={12}>
                  <span className="text1">Pour accéder à</span>
                </Col>
                <Col md={12}>
                  <span className="textDeuxMenu">notre carte</span>
                </Col>
                <Col md={12}>
                  <span className="text3Menu">scannez le</span>
                </Col>
                <Col md={12}>
                  <span className="text3Menu"> QR Code</span>
                </Col>
                <Col md={12}>
                  <span className="text3Menu">ci-dessus</span>
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
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="QRPrint">
        <div id="qrCodePdf2" ref={componentRef}>
          <Col className="backgroundTicket">
            <Row>
              <Col>
                <Row className="rowCenterWeb">
                  <Col className="borderColPrint">
                    <div id="qrCodeDivResto2" />
                  </Col>
                </Row>
                <Row>
                  <Col className="colCenter colMarginWord" md={12}>
                    <span className="text1PrintMenu">Pour accéder à</span>
                  </Col>
                  <Col className="colCenter colMarginMenu" md={12}>
                    <span className="textDeuxPrintMenu">notre carte</span>
                  </Col>
                  <Col className="colCenter colMarginMenu" md={12}>
                    <span className="text3PrintMenu c">scannez le</span>
                  </Col>
                  <Col className="colCenter colMarginMenu" md={12}>
                    <span className="text3PrintMenuGrey">QR Code</span>
                  </Col>
                  <Col className="colCenter colMarginMenu" md={12}>
                    <span className="text3PrintMenu">ci-dessus</span>
                  </Col>
                </Row>
                <Row className="rowCenterWeb colMarginEmo">
                  <Col className="colCenter ">
                    <img src="/image/emoticone.png" className="tipPicture" />
                  </Col>
                </Row>
                <Row>
                  <Col className="colCenter marginrestau " md={12}>
                    <span className="titleNameMenu">
                      {localStorage.getItem("propsRestaurant")}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
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
