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
function QrHook() {
  const [restaurant, setRestaurant] = useState();
  let uri =
    "https://back-end.osc-fr1.scalingo.io/client/getMenu?restaurantName=" +
    JSON.parse(localStorage.getItem("propsRestaurant"));
  useEffect(() => {
    console.log("dsqdsq", JSON.parse(localStorage.getItem("propsRestaurant")));
    new QRCODE(document.getElementById("qrCodeDivResto"), {
      text: encodeURI(uri),
      width: 220,
      height: 220,
      title: "Tipourboire", // content
      titleFont: "bold 20px Montserrat", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      subTitle: "Votre menu avec Tipourboire.", // content

      subTitleFont: "11px Montserrat", // font. default is "14px Arial"
      subTitleColor: "#f5a624", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);
  return (
    <div>
      <div id="qrCodeDivResto" />
      <button
        className="buttonQrCode"
        onClick={() => {
          const canvas = document.querySelector("#qrCodeDivResto canvas");
          const image = canvas.toDataURL();

          const element = document.createElement("a");
          element.setAttribute("href", image);
          element.setAttribute("download", "qrcode.png");

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        }}
      >
        Télécharger le QR Code Table
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
