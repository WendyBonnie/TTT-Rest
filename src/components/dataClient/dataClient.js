import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class DataClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client : [] ,
    };
  }
  getDataClient = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });
  
    
    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:8080/restaurateur/getDataClient", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const clientInfo = responseObject;
          this.setState({ client: clientInfo, object: clientInfo });
        },

        (error) => {
          console.log(error);
        }
      );
  };
  display = () => {
    return this.state.client.map((element, index) => {
      return (
        <Table striped bordered hover>
        <tbody>
          <tr>
            <td type="text" id="firstname" name="firstname">
              {" "}
              {element.firstname}
            </td>
            <td type="text" id="lastname" name="lastname">
              {" "}
              {element.lastname}
            </td>
            <td type="text" id="email" name="email">
              {" "}
              {element.email}
            </td>
            <td type="text" id="phone" name="phone">
              {" "}
              {element.phone}
            </td>
            <td type="text" id="age" name="age">
              {" "}
              {element.age}
            </td>
          </tr>
        </tbody>
      </Table>
      )
    })
  }

  componentDidMount() {
    this.getDataClient();
  }

  render() {
    return (
      <div>  
        <h3>Base de données client</h3>
        <div>
        {this.display()}
        </div>
       
      </div>
    
    );
  }
}

export default DataClient
