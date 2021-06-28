import React, { Component, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./dataClient.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible() {
  const [show, setShow] = useState(false);
  const [client, updateClient] = useState([]);
  const [message, setMessage] = useState(" ");

  useEffect(() => {
    getDataClient();
  }, []);

  const getDataClient = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/getDataClient",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const clientInfo = responseObject;
          updateClient((arr) => [...arr, clientInfo]);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const unSubscrition = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "DELETE",
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/unsubscribe",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          setMessage(responseObject.message);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const display = () => {
    return client.map((element, index) => {
      return (
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
      );
    });
  };

  return (
    <>
      <Alert show={show} variant="danger">
        <Alert.Heading>Résiliation d'abonnement Tipourboire</Alert.Heading>
        <p>
          Êtes-vous bien sûr de vouloir résilier votre abonnement Tipourboire ?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              unSubscrition();
            }}
            variant="outline-danger"
          >
            Résilier mon abonnement
          </Button>
          <Button onClick={() => setShow(false)} variant="outline-success">
            Annuler la résiliation
          </Button>
        </div>
      </Alert>
      <div className="bloc-data">
        <h3>Base de données client</h3>
        <div class="table-responsive">
          <button className="Telecharger" onClick={() => setShow(true)}>
            Résiliation abonnement
          </button>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="Telecharger"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Télécharger"
          />
          <Table id="table-to-xls" striped bordered hover>
            <th className="colorTitre">Nom</th>
            <th className="colorTitre">Prenom</th>
            <th className="colorTitre">Mail</th>
            <th className="colorTitre">Téléphone</th>
            <th className="colorTitre">Age</th>
            <tbody>{display()}</tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

class DataClient extends Component {
  render() {
    return <AlertDismissible />;
  }
}

export default DataClient;
