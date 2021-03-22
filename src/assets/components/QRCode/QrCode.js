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
    new QRCODE(document.getElementById("qrCodeRef"), {
      text: encodeURI(uri),
      width: 200,
      height: 200,
      title: "TIPOURBOIRE", // content
      titleFont: "bold 18px Arial", //font. default is "bold 16px Arial"
      titleColor: "#f5a624", // color. default is "#000"
      titleBackgroundColor: "#fff", // background color. default is "#fff"
      titleHeight: 70, // height, including subTitle. default is 0
      titleTop: 25, // draws y coordinates. default is 30
      subTitle: "Le nouveau pourboire digital", // content

      subTitleFont: "15px Arial", // font. default is "14px Arial"
      subTitleColor: "#f5a624", // color. default is "4F4F4F"
      subTitleTop: 50, // draws y coordinates. default is 0
    });
  }, []);
  return <div id="qrCodeRef" />;
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
