import React, { Component } from "react";
import DailyMenu from "../../assets/components/DailyMenu/DailyMenu";
import OtherMenu from "../../assets/components/OtherMenu/OtherMenu";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <div className="menus">
        <Row>
          <Col>
            <DailyMenu />
          </Col>
          <Col md={12} sm={12}>
            <OtherMenu />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Menu;
